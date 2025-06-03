import { parse } from "path";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idToInteger, idToString } from "../utils/formater.util.js";
import { getIdAuthValidation } from "../validation/auth.validate.js";
import notifikasiService from "./notifikasi.service.js";
import { getUrlFile } from "../application/storage.js";

const getListDikirim = async (request) => {
  const page = Math.max(1, parseInt(request.page) || 1);
  const limit = Math.max(1, parseInt(request.limit) || 10);
  const status = request.status || "ALL";
  const skip = (page - 1) * limit;

  const validStatuses = ["DIPROSES", "SEDANG_DIKIRIM", "SUDAH_DITERIMA"];
  if (status !== "ALL" && !validStatuses.includes(status)) {
    throw new ResponseError("Invalid status_pengiriman value", 400);
  }

  const [countAllPengiriman, listPengiriman] = await Promise.all([
    prismaClient.pengiriman.count({
      where: {
        status_pengiriman: status === "ALL" ? undefined : status,
        transaksi: { metode_pengiriman: "DIKIRIM" },
      },
    }),
    prismaClient.pengiriman.findMany({
      where: {
        status_pengiriman: status === "ALL" ? undefined : status,
        transaksi: { metode_pengiriman: "DIKIRIM" },
      },
      include: {
        kurir: {
          select: { id_pegawai: true, nama: true, nomor_telepon: true },
        },
        transaksi: {
          include: {
            pembeli: {
              include: {
                user: true,
              },
            },
            alamat: true,
            detail_transaksi: {
              include: {
                barang: {
                  include: {
                    detail_penitipan: {
                      include: {
                        penitipan: {
                          include: {
                            pegawai_qc: true,
                          },
                        },
                      },
                    },
                    gambar: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
      skip: skip,
      take: limit,
    }),
  ]);

  if (!listPengiriman || listPengiriman.length === 0) {
    throw new ResponseError("No pengiriman data found", 404);
  }

  // Transform image URLs using getUrlFile
  try {
    await Promise.all(
      listPengiriman.map(async (pengiriman) => {
        pengiriman.transaksi.detail_transaksi = await Promise.all(
          pengiriman.transaksi.detail_transaksi.map(async (dt) => {
            dt.barang.gambar = await Promise.all(
              dt.barang.gambar.map(async (g) => {
                return {
                  url_gambar: await getUrlFile(g.url_gambar),
                  is_primary: g.is_primary,
                };
              })
            );
            return dt;
          })
        );
      })
    );
  } catch {}

  const formattedPengiriman = listPengiriman.map((p) => ({
    id_pengiriman: p.id_pengiriman,
    tanggal: p.tanggal,
    status_pengiriman: p.status_pengiriman,
    id_kurir: p.id_kurir,
    id_transaksi: p.id_transaksi,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    kurir: p.kurir
      ? {
          id_kurir: p.kurir.id_pegawai,
          nama: p.kurir.nama,
          no_hp_kurir: p.kurir.nomor_telepon,
        }
      : null,
    transaksi: {
      id_transaksi: p.transaksi.id_transaksi,
      tanggal_transaksi: p.transaksi.tanggal_transaksi,
      tanggal_pembayaran: p.transaksi.tanggal_pembayaran,
      metode_pengiriman: p.transaksi.metode_pengiriman,
      status_pembayaran: p.transaksi.status_Pembayaran,
      total_harga: p.transaksi.total_harga,
      ongkos_kirim: p.transaksi.ongkos_kirim,
      total_poin: p.transaksi.total_poin,
      potongan_poin: p.transaksi.potongan_poin,
      total_akhir: p.transaksi.total_akhir,
      pembeli: {
        id_pembeli: p.transaksi.pembeli.id_pembeli,
        nama: p.transaksi.pembeli.nama,
        email: p.transaksi.pembeli.user.email,
        poin_loyalitas: p.transaksi.pembeli.poin_loyalitas,
      },
      detail_transaksi: p.transaksi.detail_transaksi.map((dt) => ({
        barang: {
          id_barang: dt.barang.id_barang,
          nama_barang: dt.barang.nama_barang,
          harga: dt.barang.harga,
          id_qc: idToString(
            dt.barang.detail_penitipan.penitipan.pegawai_qc.prefix,
            dt.barang.detail_penitipan.penitipan.pegawai_qc.id_pegawai
          ),
          nama_qc: dt.barang.detail_penitipan.penitipan.pegawai_qc.nama,
          gambar: dt.barang.gambar,
        },
      })),
      alamat: p.transaksi.alamat
        ? {
            id_alamat: p.transaksi.alamat.id_alamat,
            detail_alamat: p.transaksi.alamat.detail_alamat,
          }
        : null,
    },
  }));

  return {
    data: formattedPengiriman,
    total: countAllPengiriman,
    page,
    limit,
    totalPages: Math.ceil(countAllPengiriman / limit),
  };
};

const getListDiambil = async (request) => {
  const page = Math.max(1, parseInt(request.page) || 1);
  const limit = Math.max(1, parseInt(request.limit) || 10);
  const status = request.status || "ALL";
  const skip = (page - 1) * limit;

  const validStatuses = ["DIPROSES", "SIAP_DIAMBIL", "SUDAH_DITERIMA"];
  if (status !== "ALL" && !validStatuses.includes(status)) {
    throw new ResponseError("Invalid status_pengiriman value", 400);
  }

  const [countAllPengiriman, listPengiriman] = await Promise.all([
    prismaClient.pengiriman.count({
      where: {
        status_pengiriman: status === "ALL" ? undefined : status,
        transaksi: { metode_pengiriman: "DIAMBIL" },
      },
    }),
    prismaClient.pengiriman.findMany({
      where: {
        status_pengiriman: status === "ALL" ? undefined : status,
        transaksi: { metode_pengiriman: "DIAMBIL" },
      },
      include: {
        kurir: {
          select: { id_pegawai: true, nama: true, nomor_telepon: true },
        },
        transaksi: {
          include: {
            pembeli: {
              include: {
                user: true,
              },
            },
            alamat: true,
            detail_transaksi: {
              include: {
                barang: {
                  include: {
                    detail_penitipan: {
                      include: {
                        penitipan: {
                          include: {
                            pegawai_qc: true,
                          },
                        },
                      },
                    },
                    gambar: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
      skip: skip,
      take: limit,
    }),
  ]);

  if (!listPengiriman || listPengiriman.length === 0) {
    throw new ResponseError("No pengiriman data found", 404);
  }

  // Transform image URLs using getUrlFile
  try {
    await Promise.all(
      listPengiriman.map(async (pengiriman) => {
        pengiriman.transaksi.detail_transaksi = await Promise.all(
          pengiriman.transaksi.detail_transaksi.map(async (dt) => {
            dt.barang.gambar = await Promise.all(
              dt.barang.gambar.map(async (g) => {
                return {
                  url_gambar: await getUrlFile(g.url_gambar),
                  is_primary: g.is_primary,
                };
              })
            );
            return dt;
          })
        );
      })
    );
  } catch {}

  const formattedPengiriman = listPengiriman.map((p) => ({
    id_pengiriman: p.id_pengiriman,
    tanggal: p.tanggal,
    status_pengiriman: p.status_pengiriman,
    id_kurir: p.id_kurir,
    id_transaksi: p.id_transaksi,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    kurir: p.kurir
      ? {
          id_kurir: p.kurir.id_pegawai,
          nama: p.kurir.nama,
          no_hp_kurir: p.kurir.nomor_telepon,
        }
      : null,
    transaksi: {
      id_transaksi: p.transaksi.id_transaksi,
      tanggal_transaksi: p.transaksi.tanggal_transaksi,
      tanggal_pembayaran: p.transaksi.tanggal_pembayaran,
      metode_pengiriman: p.transaksi.metode_pengiriman,
      status_pembayaran: p.transaksi.status_Pembayaran,
      total_harga: p.transaksi.total_harga,
      ongkos_kirim: p.transaksi.ongkos_kirim,
      total_poin: p.transaksi.total_poin,
      potongan_poin: p.transaksi.potongan_poin,
      total_akhir: p.transaksi.total_akhir,
      pembeli: {
        id_pembeli: p.transaksi.pembeli.id_pembeli,
        nama: p.transaksi.pembeli.nama,
        email: p.transaksi.pembeli.user.email,
        poin_loyalitas: p.transaksi.pembeli.poin_loyalitas,
      },
      detail_transaksi: p.transaksi.detail_transaksi.map((dt) => ({
        barang: {
          id_barang: dt.barang.id_barang,
          nama_barang: dt.barang.nama_barang,
          harga: dt.barang.harga,
          id_qc: idToString(
            dt.barang.detail_penitipan.penitipan.pegawai_qc.prefix,
            dt.barang.detail_penitipan.penitipan.pegawai_qc.id_pegawai
          ),
          nama_qc: dt.barang.detail_penitipan.penitipan.pegawai_qc.nama,
          gambar: dt.barang.gambar,
        },
      })),
      alamat: p.transaksi.alamat
        ? {
            id_alamat: p.transaksi.alamat.id_alamat,
            detail_alamat: p.transaksi.alamat.detail_alamat,
          }
        : null,
    },
  }));

  return {
    data: formattedPengiriman,
    total: countAllPengiriman,
    page,
    limit,
    totalPages: Math.ceil(countAllPengiriman / limit),
  };
};

const aturPengiriman = async (request) => {
  await prismaClient.$transaction(async (tx) => {
    const id_pengiriman = parseInt(request.id_pengiriman, 10);
    request.tanggal = new Date(request.tanggal).toISOString();
    request.id_kurir = idToInteger(request.id_kurir);

    const pengiriman = await tx.pengiriman.findUnique({
      where: {
        id_pengiriman: id_pengiriman,
      },
      select: {
        id_kurir: true,
        transaksi: {
          select: {
            id_pembeli: true,
            detail_transaksi: {
              select: {
                barang: {
                  select: {
                    detail_penitipan: {
                      select: {
                        penitipan: {
                          select: {
                            id_penitip: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!pengiriman) {
      throw new ResponseError(404, "Pengiriman tidak ditemukan");
    }

    const updatedPengiriman = await tx.pengiriman.update({
      where: {
        id_pengiriman: id_pengiriman,
      },
      data: {
        tanggal: request.tanggal,
        status_pengiriman: "SEDANG_DIKIRIM",
        id_kurir: request.id_kurir,
        updatedAt: new Date(),
      },
      select: {
        id_kurir: true,
        tanggal: true,
        transaksi: {
          select: {
            id_pembeli: true,
            detail_transaksi: {
              include: {
                barang: {
                  select: {
                    nama_barang: true,
                    detail_penitipan: {
                      select: {
                        penitipan: {
                          select: {
                            id_penitip: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const [kurir, pembeli, listPenitip] = await Promise.all([
      await tx.pegawai.findUnique({
        where: {
          id_pegawai: request.id_kurir,
        },
        select: {
          id_user: true,
          nama: true,
        },
      }),
      await tx.pembeli.findUnique({
        where: {
          id_pembeli: pengiriman.transaksi.id_pembeli,
        },
        select: {
          id_user: true,
          nama: true,
        },
      }),
      await Promise.all(
        pengiriman.transaksi.detail_transaksi.map(async (trx) => {
          return await tx.penitip.findUnique({
            where: {
              id_penitip: trx.barang.detail_penitipan.penitipan.id_penitip,
            },
            select: {
              id_user: true,
              nama: true,
            },
          });
        })
      ),
    ]);

    const formater = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const formattedDatetime = formater.format(
      new Date(updatedPengiriman.tanggal)
    );

    const listNamaBarang = updatedPengiriman.transaksi.detail_transaksi.map(
      (dtl) => {
        return dtl.barang.nama_barang;
      }
    );

    const toSendKurir = {
      user_id: kurir.id_user,
      title: "Jadwal Pengiriman Barang",
      body: `Halo ${kurir.nama}, barang ${listNamaBarang.join(
        ", "
      )} dijadwalkan untuk dikirim pada ${formattedDatetime}. Pastikan pengiriman tepat waktu ya!`,
    };

    const toSendPembeli = {
      user_id: pembeli.id_user,
      title: "Pesananmu Sedang Dalam Perjalanan!",
      body: `Halo ${pembeli.nama}, pesananmu ${listNamaBarang.join(
        ", "
      )} akan dikirim pada ${formattedDatetime}. Cek detail transaksi di aplikasi untuk perkiraan waktu tiba. Terima kasih telah berbelanja!`,
    };

    await Promise.all([
      await notifikasiService.sendNotification(toSendKurir),
      await Promise.all(
        listPenitip.map(async (penitip) => {
          const toSendPenitip = {
            user_id: penitip.id_user,
            title: "Barang Titipanmu Siap Dikirim ke Pembeli!",
            body: `Halo ${penitip.nama}, barang ${listNamaBarang.join(
              ", "
            )} dijadwalkan akan dikirim pada ${formattedDatetime}. Pantau statusnya di aplikasi dan pastikan semua detail sudah benar. Terima kasih!`,
          };

          await notifikasiService.sendNotification(toSendPenitip);
        })
      ),
      await notifikasiService.sendNotification(toSendPembeli),
    ]);

    return "OK";
  });
  return "OK";
};

const aturPengambilan = async (request) => {
  await prismaClient.$transaction(async (tx) => {
    const id_pengiriman = parseInt(request.id_pengiriman, 10);
    request.tanggal = new Date(request.tanggal).toISOString();

    const pengiriman = await tx.pengiriman.findUnique({
      where: {
        id_pengiriman: id_pengiriman,
      },
      select: {
        id_kurir: true,
        transaksi: {
          select: {
            id_pembeli: true,
            detail_transaksi: {
              select: {
                barang: {
                  select: {
                    detail_penitipan: {
                      select: {
                        penitipan: {
                          select: {
                            id_penitip: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!pengiriman) {
      throw new ResponseError(404, "Pengiriman tidak ditemukan");
    }

    const updatedPengiriman = await tx.pengiriman.update({
      where: {
        id_pengiriman: id_pengiriman,
      },
      data: {
        tanggal: request.tanggal,
        status_pengiriman: "SIAP_DIAMBIL",
        updatedAt: new Date(),
      },
      select: {
        id_kurir: true,
        tanggal: true,
        transaksi: {
          select: {
            id_pembeli: true,
            detail_transaksi: {
              include: {
                barang: {
                  select: {
                    nama_barang: true,
                    detail_penitipan: {
                      select: {
                        penitipan: {
                          select: {
                            id_penitip: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const [pembeli, listPenitip] = await Promise.all([
      await tx.pembeli.findUnique({
        where: {
          id_pembeli: pengiriman.transaksi.id_pembeli,
        },
        select: {
          id_user: true,
          nama: true,
        },
      }),
      await Promise.all(
        pengiriman.transaksi.detail_transaksi.map(async (trx) => {
          return await tx.penitip.findUnique({
            where: {
              id_penitip: trx.barang.detail_penitipan.penitipan.id_penitip,
            },
            select: {
              id_user: true,
              nama: true,
            },
          });
        })
      ),
    ]);

    const formater = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const formattedDatetime = formater.format(
      new Date(updatedPengiriman.tanggal)
    );

    const listNamaBarang = updatedPengiriman.transaksi.detail_transaksi.map(
      (dtl) => {
        return dtl.barang.nama_barang;
      }
    );

    const toSendPembeli = {
      user_id: pembeli.id_user,
      title: "Pesananmu Siap Diambil!",
      body: `Halo ${pembeli.nama}, pesananmu ${listNamaBarang.join(
        ", "
      )} siap di ambil pada ${formattedDatetime}. Cek detail transaksi di aplikasi untuk informasi lebih lanjut. Terima kasih telah berbelanja!`,
    };

    await Promise.all([
      await notifikasiService.sendNotification(toSendPembeli),
      await Promise.all(
        listPenitip.map(async (penitip) => {
          const toSendPenitip = {
            user_id: penitip.id_user,
            title: "Barang Titipanmu Siap Diambil Pembeli!",
            body: `Halo ${penitip.nama}, barang titipanmu ${listNamaBarang.join(
              ", "
            )} siap diambil pembeli pada ${formattedDatetime}. Pantau statusnya di aplikasi dan pastikan semua detail sudah benar. Terima kasih!`,
          };

          await notifikasiService.sendNotification(toSendPenitip);
        })
      ),
    ]);

    return "OK";
  });

  return "OK";
};

// const konfirmasiPengambilan = async (request) => {
//   await prismaClient.$transaction(async (tx) => {
//     const id_pengiriman = parseInt(request.id_pengiriman, 10);

//     const pengiriman = await tx.pengiriman.findUnique({
//       where: {
//         id_pengiriman: id_pengiriman,
//       },
//       include: {
//         transaksi: {
//           include: {
//             pembeli: true,
//             detail_transaksi: {
//               include: {
//                 barang: {
//                   include: {
//                     detail_penitipan: {
//                       include: {
//                         penitipan: {
//                           include: {
//                             penitip: true,
//                             hunter: true,
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     });

//     if (!pengiriman) {
//       throw new ResponseError(404, "Pengiriman tidak ditemukan");
//     }

//     const tglTransaksi = pengiriman.transaksi.tanggal_transaksi;

//     await Promise.all(
//       pengiriman.transaksi.detail_transaksi.map(async (dt) => {
//         let persenKomisiReusemart = 0;
//         if (dt.barang.detail_penitipan.penitipan.is_perpanjang === true) {
//           if (dt.barang.detail_penitipan.penitipan.id_hunter !== null) {
//             persenKomisiReusemart = 0.25; // 25% untuk perpanjang penitipan dengan hunter
//           } else {
//             persenKomisiReusemart = 0.3; // 30% untuk perpanjang penitipan tanpa hunter
//           }
//         } else {
//           if (dt.barang.detail_penitipan.penitipan.id_hunter !== null) {
//             persenKomisiReusemart = 0.15; // 15% untuk penitipan dengan hunter
//           } else {
//             persenKomisiReusemart = 0.2; // 20% untuk penitipan tanpa hunter
//           }
//         }
//         const komisiHunter =
//           dt.barang.detail_penitipan.penitipan.id_hunter !== null
//             ? dt.barang.harga * 0.05
//             : 0;
//         let komisiReusemart = dt.barang.harga * persenKomisiReusemart;
//         let komisiPenitip = 0;
//         if (
//           tglTransaksi.getTime() <
//           dt.barang.detail_penitipan.tanggal_masuk.getTime() +
//             7 * 24 * 60 * 60 * 1000
//         ) {
//           komisiPenitip = komisiReusemart * 0.1; // 10% untuk penitipan kurang dari 7 hari
//           komisiReusemart -= komisiPenitip; // kurangi komisi penitip dari komisi reusemart
//         }
//         const pendapatanPenitip =
//           dt.barang.harga - komisiHunter - komisiReusemart + komisiPenitip;

//         await tx.penitip.update({
//           where: {
//             id_penitip: dt.barang.detail_penitipan.penitipan.id_penitip,
//           },
//           data: {
//             saldo: {
//               increment: pendapatanPenitip,
//             },
//           },
//         });

//         if (dt.barang.detail_penitipan.penitipan.id_hunter !== null) {
//           await tx.pegawai.update({
//             where: {
//               id_pegawai: dt.barang.detail_penitipan.penitipan.id_hunter,
//             },
//             data: {
//               komisi: {
//                 increment: komisiHunter,
//               },
//             },
//           });
//         }

//         await tx.detailTransaksi.update({
//           where: {
//             id_dtl_transaksi: dt.id_dtl_transaksi,
//           },
//           data: {
//             komisi_hunter: {
//               increment: komisiHunter,
//             },
//             komisi_reusemart: {
//               increment: komisiReusemart,
//             },
//             komisi_penitip: {
//               increment: pendapatanPenitip,
//             },
//           },
//         });
//       })
//     );

//     await tx.pengiriman.update({
//       where: {
//         id_pengiriman: id_pengiriman,
//       },
//       data: {
//         status_pengiriman: "SUDAH_DITERIMA",
//         updatedAt: new Date(),
//       },
//     });

//     //tambah poin pembeli
//     await tx.pembeli.update({
//       where: {
//         id_pembeli: pengiriman.transaksi.pembeli.id_pembeli,
//       },
//       data: {
//         poin_loyalitas:
//           pengiriman.transaksi.pembeli.poin_loyalitas +
//           pengiriman.transaksi.total_poin,
//       },
//     });

//     return "OK";
//   });
//   return "OK";
// };

const konfirmasiPengambilan = async (request) => {
  await prismaClient.$transaction(async (tx) => {
    const id_pengiriman = parseInt(request.id_pengiriman, 10);

    const pengiriman = await tx.pengiriman.findUnique({
      where: {
        id_pengiriman: id_pengiriman,
      },
      include: {
        transaksi: {
          include: {
            pembeli: {
              include: {
                user: true, // Include user to get id_user for notifications
              },
            },
            detail_transaksi: {
              include: {
                barang: {
                  include: {
                    detail_penitipan: {
                      include: {
                        penitipan: {
                          include: {
                            penitip: {
                              include: {
                                user: true, // Include user to get id_user for notifications
                              },
                            },
                            hunter: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!pengiriman) {
      throw new ResponseError(404, "Pengiriman tidak ditemukan");
    }

    // Validate status_pengiriman to ensure it's in a confirmable state
    const validStatuses = ["SIAP_DIAMBIL"];
    if (!validStatuses.includes(pengiriman.status_pengiriman)) {
      throw new ResponseError(
        `Pengiriman dengan status ${pengiriman.status_pengiriman} tidak dapat dikonfirmasi`,
        400
      );
    }

    const tglTransaksi = pengiriman.transaksi.tanggal_transaksi;

    // Calculate commissions and update records
    await Promise.all(
      pengiriman.transaksi.detail_transaksi.map(async (dt) => {
        let persenKomisiReusemart = 0;
        if (dt.barang.detail_penitipan.penitipan.is_perpanjang === true) {
          if (dt.barang.detail_penitipan.penitipan.id_hunter !== null) {
            persenKomisiReusemart = 0.25; // 25% untuk perpanjang penitipan dengan hunter
          } else {
            persenKomisiReusemart = 0.3; // 30% untuk perpanjang penitipan tanpa hunter
          }
        } else {
          if (dt.barang.detail_penitipan.penitipan.id_hunter !== null) {
            persenKomisiReusemart = 0.15; // 15% untuk penitipan dengan hunter
          } else {
            persenKomisiReusemart = 0.2; // 20% untuk penitipan tanpa hunter
          }
        }
        const komisiHunter =
          dt.barang.detail_penitipan.penitipan.id_hunter !== null
            ? dt.barang.harga * 0.05
            : 0;
        let komisiReusemart = dt.barang.harga * persenKomisiReusemart;
        let komisiPenitip = 0;
        if (
          tglTransaksi.getTime() <
          dt.barang.detail_penitipan.tanggal_masuk.getTime() +
            7 * 24 * 60 * 60 * 1000
        ) {
          komisiPenitip = komisiReusemart * 0.1; // 10% untuk penitipan kurang dari 7 hari
          komisiReusemart -= komisiPenitip; // kurangi komisi penitip dari komisi reusemart
        }
        const pendapatanPenitip =
          dt.barang.harga - komisiHunter - komisiReusemart + komisiPenitip;

        await tx.penitip.update({
          where: {
            id_penitip: dt.barang.detail_penitipan.penitipan.id_penitip,
          },
          data: {
            saldo: {
              increment: pendapatanPenitip,
            },
          },
        });

        if (dt.barang.detail_penitipan.penitipan.id_hunter !== null) {
          await tx.pegawai.update({
            where: {
              id_pegawai: dt.barang.detail_penitipan.penitipan.id_hunter,
            },
            data: {
              komisi: {
                increment: komisiHunter,
              },
            },
          });
        }

        await tx.detailTransaksi.update({
          where: {
            id_dtl_transaksi: dt.id_dtl_transaksi,
          },
          data: {
            komisi_hunter: {
              increment: komisiHunter,
            },
            komisi_reusemart: {
              increment: komisiReusemart,
            },
            komisi_penitip: {
              increment: pendapatanPenitip,
            },
          },
        });
      })
    );

    // Update pengiriman status
    await tx.pengiriman.update({
      where: {
        id_pengiriman: id_pengiriman,
      },
      data: {
        status_pengiriman: "SUDAH_DITERIMA",
        updatedAt: new Date(),
      },
    });

    // Tambah poin pembeli
    await tx.pembeli.update({
      where: {
        id_pembeli: pengiriman.transaksi.pembeli.id_pembeli,
      },
      data: {
        poin_loyalitas:
          pengiriman.transaksi.pembeli.poin_loyalitas +
          pengiriman.transaksi.total_poin,
      },
    });

    // Prepare notifications
    const formater = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const formattedDatetime = formater.format(new Date());

    const listNamaBarang = pengiriman.transaksi.detail_transaksi.map(
      (dtl) => dtl.barang.nama_barang
    );

    // Notification for pembeli
    const toSendPembeli = {
      user_id: pengiriman.transaksi.pembeli.user.id_user,
      title: "Pesananmu Telah Diambil!",
      body: `Halo ${
        pengiriman.transaksi.pembeli.nama
      }, pesananmu ${listNamaBarang.join(
        ", "
      )} telah berhasil diambil pada ${formattedDatetime}. Terima kasih telah berbelanja!`,
    };

    // Notifications for each penitip
    const listPenitip = await Promise.all(
      pengiriman.transaksi.detail_transaksi.map(async (dt) => {
        return {
          user_id: dt.barang.detail_penitipan.penitipan.penitip.user.id_user,
          nama: dt.barang.detail_penitipan.penitipan.penitip.nama,
          nama_barang: dt.barang.nama_barang,
        };
      })
    );

    // Send notifications
    await Promise.all([
      notifikasiService.sendNotification(toSendPembeli),
      ...listPenitip.map((penitip) =>
        notifikasiService.sendNotification({
          user_id: penitip.user_id,
          title: "Barang Titipanmu Telah Diambil!",
          body: `Halo ${penitip.nama}, barang titipanmu ${penitip.nama_barang} telah diambil oleh pembeli pada ${formattedDatetime}. Saldo telah diperbarui di akunmu. Terima kasih!`,
        })
      ),
    ]);
  });

  return "OK";
};

const cekPengirimanHangus = async () => {
  const listSiapDiambil = await prismaClient.pengiriman.findMany({
    where: {
      status_pengiriman: "SIAP_DIAMBIL",
    },
    include: {
      transaksi: {
        include: {
          detail_transaksi: {
            include: {
              barang: true,
            },
          },
        },
      },
    },
  });

  await Promise.all(
    listSiapDiambil.map(async (pengiriman) => {
      const waktuPengambilan = new Date(pengiriman.tanggal);
      const deadline = new Date(
        waktuPengambilan.getTime() + 48 * 60 * 60 * 1000
      ); // 48 jam setelah waktu pengambilan
      const waktuSekarang = new Date();

      // Cek apakah sudah lebih dari 1 jam
      if (waktuSekarang > deadline) {
        // Update status pengiriman menjadi HANGUS
        await prismaClient.pengiriman.update({
          where: {
            id_pengiriman: pengiriman.id_pengiriman,
          },
          data: {
            status_pengiriman: "DIBATALKAN",
            updatedAt: new Date(),
          },
        });

        console.log(
          `Pengiriman dengan ID ${pengiriman.id_pengiriman} telah dibatalkan karena sudah lebih dari 48 jam.`
        );

        await Promise.all(
          pengiriman.transaksi.detail_transaksi.map(async (dt) => {
            await prismaClient.barang.update({
              where: {
                id_barang: dt.barang.id_barang,
              },
              data: {
                status: "DIDONASIKAN",
              },
            });
            console.log(
              `Barang dengan ID ${dt.barang.id_barang} telah didonasikan karena pengiriman hangus.`
            );
          })
        );
      }
    })
  );
  return "OK";
};

const cekPengirimanSedangDikirimToday = async () => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const listSedangDikirimToday = await prismaClient.pengiriman.findMany({
    where: {
      status_pengiriman: "SEDANG_DIKIRIM",
      tanggal: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      transaksi: {
        include: {
          pembeli: true,
          detail_transaksi: {
            include: {
              barang: {
                include: {
                  detail_penitipan: {
                    include: {
                      penitipan: {
                        include: {
                          penitip: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (listSedangDikirimToday.length > 0) {
    await Promise.all(
      listSedangDikirimToday.map(async (pengirimanToday) => {
        const listNamaBarang = pengirimanToday.transaksi.detail_transaksi.map(
          (dtl) => {
            return dtl.barang.nama_barang;
          }
        );
        const toSendPembeli = {
          user_id: pengirimanToday.transaksi.pembeli.id_user,
          title: "Pesananmu Sedang Diantarkan!",
          body: `Halo ${
            pengirimanToday.transaksi.pembeli.nama
          }, pesananmu ${listNamaBarang.join(
            ", "
          )} hari ini sedang dikirim. Cek detail transaksi di aplikasi untuk informasi lebih lanjut. Terima kasih telah berbelanja!`,
        };
        await notifikasiService.sendNotification(toSendPembeli);
        await Promise.all(
          pengirimanToday.transaksi.detail_transaksi.map(async (dtl) => {
            const toSendPenitip = {
              user_id: dtl.barang.detail_penitipan.penitipan.penitip.id_user,
              title: "Barang Titipanmu Sedang Diantarkan Ke Pembeli!",
              body: `Halo ${dtl.barang.detail_penitipan.penitipan.penitip.nama}, barang titipanmu ${dtl.barang.nama_barang} hari ini sedang dikirim ke pembeli. Pantau statusnya di aplikasi dan pastikan semua detail sudah benar. Terima kasih!`,
            };
            await notifikasiService.sendNotification(toSendPenitip);
          })
        );
      })
    );
  }

  return "OK";
};

// const update = async (request) => {
//   const updateRequest = validate(updatePengirimanValidation, request);
//   const id_pengiriman = idToInteger(updateRequest.id_pengiriman);

//   const pengiriman = await prismaClient.pengiriman.findUnique({
//     where: {
//       id_pengiriman: id_pengiriman,
//     },
//   });

//   if (!pengiriman) {
//     throw new ResponseError(404, "Pengiriman tidak ditemukan");
//   }

//   const updatedPengiriman = await prismaClient.pengiriman.update({
//     where: {
//       id_pengiriman: id_pengiriman,
//     },
//     data: {
//       tanggal: updateRequest.tanggal || pengiriman.tanggal,
//       status_pengiriman:
//         updateRequest.status_pengiriman || pengiriman.status_pengiriman,
//       id_kurir: updateRequest.id_kurir || pengiriman.id_kurir,
//       id_transaksi: updateRequest.id_transaksi || pengiriman.id_transaksi,
//       updatedAt: new Date(),
//     },
//   });

//   return {
//     id_pengiriman: idToString(updatedPengiriman.id_pengiriman),
//     tanggal: updatedPengiriman.tanggal,
//     status_pengiriman: updatedPengiriman.status_pengiriman,
//     id_kurir: idToString(updatedPengiriman.id_kurir),
//     id_transaksi: idToString(updatedPengiriman.id_transaksi),
//     createdAt: updatedPengiriman.createdAt,
//     updatedAt: updatedPengiriman.updatedAt,
//   };
// };

// const destroy = async (id) => {
//   id = validate(getPengirimanValidation, id);
//   const id_pengiriman = idToInteger(id);

//   const pengiriman = await prismaClient.pengiriman.findUnique({
//     where: {
//       id_pengiriman: id_pengiriman,
//     },
//   });

//   if (!pengiriman) {
//     throw new ResponseError(404, "Pengiriman tidak ditemukan");
//   }

//   await prismaClient.pengiriman.delete({
//     where: {
//       id_pengiriman: id_pengiriman,
//     },
//   });

//   return { message: "Pengiriman deleted successfully" };
// };

export default {
  //   create,
  // get,
  getListDikirim,
  getListDiambil,
  aturPengiriman,
  aturPengambilan,
  konfirmasiPengambilan,
  cekPengirimanHangus,
  cekPengirimanSedangDikirimToday,
  // destroy,
};
