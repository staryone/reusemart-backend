import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { getUrlFile, uploadFile } from "../application/storage.js";
import { ResponseError } from "../errors/response.error.js";
import { formatUTCtoWIB } from "../utils/date.util.js";
import {
  formatBuktiPembayaran,
  generateNomorNota,
  idToInteger,
  idToString,
} from "../utils/formater.util.js";
import {
  createTransaksiValidation,
  getTransaksiValidation,
  updateBuktiPembayaranTransaksiValidation,
} from "../validation/transaksi.validate.js";
import { validate } from "../validation/validate.js";

const create = async (request) => {
  request = validate(createTransaksiValidation, request);

  const listBarang = await Promise.all(
    request.id_barang.map(async (id) => {
      const result = await prismaClient.barang.findUnique({
        where: {
          id_barang: idToInteger(id),
        },
        select: {
          id_barang: true,
          harga: true,
        },
      });
      result.poin = parseInt(result.harga / 10000);
      return result;
    })
  );

  delete request.id_barang;

  console.log(listBarang);

  const result = await prismaClient.$transaction(async (tx) => {
    const total_harga = listBarang.reduce(
      (acc, barang) => acc + barang.harga,
      0
    );
    const total_poin = listBarang.reduce((acc, barang) => acc + barang.poin, 0);
    const tanggal_transaksi = new Date();
    const batas_pembayaran = new Date(
      tanggal_transaksi.getTime() + 1 * 60 * 1000
    );

    const ongkos_kirim =
      String(request.metode_pembayaran).toUpperCase() === "DIKIRIM" &&
      total_harga < 1500000
        ? 100000
        : 0;

    const { poin_loyalitas } = await tx.pembeli.findUnique({
      where: {
        id_pembeli: request.id_pembeli,
      },
      select: {
        poin_loyalitas: true,
      },
    });

    if (request.potongan_poin > poin_loyalitas) {
      throw new ResponseError(
        401,
        "Poin gagal terpotong karena tidak cukup! " + request.potongan_poin
      );
    }

    const potongan_harga = request.potongan_poin * 0.01 * 10000;

    const total_akhir = total_harga + ongkos_kirim - potongan_harga;

    const transaksiData = {
      ...request,
      total_harga: total_harga,
      tanggal_transaksi: tanggal_transaksi,
      batas_pembayaran: batas_pembayaran,
      updatedAt: tanggal_transaksi,
      total_poin:
        total_harga > 500000
          ? parseInt(total_poin + total_poin * 0.2)
          : total_poin,
      ongkos_kirim: ongkos_kirim,
      total_akhir: total_akhir,
    };

    const result = await tx.transaksi.create({
      data: transaksiData,
      select: {
        id_transaksi: true,
        id_pembeli: true,
        potongan_poin: true,
      },
    });

    await Promise.all(
      listBarang.map(async (barang) => {
        await tx.detailTransaksi.create({
          data: {
            id_barang: barang.id_barang,
            poin: barang.poin,
            id_transaksi: result.id_transaksi,
          },
        });
        await tx.barang.update({
          where: {
            id_barang: barang.id_barang,
          },
          data: {
            status: "TERJUAL",
          },
        });
      })
    );

    await tx.pembeli.update({
      where: {
        id_pembeli: result.id_pembeli,
      },
      data: {
        poin_loyalitas: poin_loyalitas - result.potongan_poin,
      },
    });

    await tx.keranjang.deleteMany({
      where: {
        AND: [
          {
            id_pembeli: request.id_pembeli,
          },
          {
            is_selected: true,
          },
        ],
      },
    });
    return result.id_transaksi;
  });

  return result.toString();
};

const get = async (id_transaksi, id_pembeli) => {
  id_transaksi = validate(getTransaksiValidation, id_transaksi);

  const transaksi = await prismaClient.transaksi.findUnique({
    where: {
      id_transaksi: id_transaksi,
    },
  });

  if (transaksi.id_pembeli !== id_pembeli) {
    throw new ResponseError(
      401,
      "Akses ditolak! Anda bukan pemilik transaksi ini!"
    );
  }

  console.log({
    nomor_transaksi: generateNomorNota(
      transaksi.tanggal_transaksi,
      transaksi.id_transaksi
    ),
    ...transaksi,
  });

  return {
    nomor_transaksi: generateNomorNota(
      transaksi.tanggal_transaksi,
      transaksi.id_transaksi
    ),
    ...transaksi,
  };
};

const updateBuktiPembayaranByPembeli = async (
  request,
  id_pembeli,
  id_transaksi
) => {
  id_transaksi = validate(getTransaksiValidation, id_transaksi);
  const fotoArray = validate(updateBuktiPembayaranTransaksiValidation, request);

  const fotoBuktiPembayaran = fotoArray[0];
  const formatFoto =
    "bukti_pembayaran/" +
    formatBuktiPembayaran(id_pembeli) +
    "." +
    String(fotoBuktiPembayaran.mimetype).slice(6);
  fotoBuktiPembayaran.fieldname = formatBuktiPembayaran(id_pembeli);
  const now = new Date();

  const transaksi = await prismaClient.transaksi.findUnique({
    where: {
      id_transaksi: id_transaksi,
    },
    select: {
      id_pembeli: true,
    },
  });

  if (transaksi.id_pembeli !== id_pembeli) {
    throw new ResponseError(
      401,
      "Akses ditolak, anda bukan pemilik transaksi ini!"
    );
  }

  await Promise.all([
    prismaClient.transaksi.update({
      where: {
        id_transaksi: id_transaksi,
      },
      data: {
        tanggal_pembayaran: now,
        bukti_transfer: formatFoto,
        status_Pembayaran: "SUDAH_DIBAYAR",
        updatedAt: now,
      },
    }),
    uploadFile(fotoBuktiPembayaran, "bukti_pembayaran"),
  ]);

  return "OK";
};

const updateExpiredPayment = async (id_transaksi, id_pembeli) => {
  id_transaksi = validate(getTransaksiValidation, id_transaksi);
  const transaksi = await prismaClient.transaksi.findUnique({
    where: {
      id_transaksi: id_transaksi,
    },
    select: {
      id_pembeli,
      detail_transaksi: {
        select: {
          id_barang: true,
        },
      },
    },
  });

  if (transaksi.id_pembeli !== id_pembeli) {
    throw new ResponseError(
      401,
      "Akses gagal, anda bukan pemilik transaksi ini!"
    );
  }

  await prismaClient.$transaction(async (tx) => {
    const listIdBarang = transaksi.detail_transaksi.map((detail) => {
      return detail.id_barang;
    });

    await Promise.all([
      tx.transaksi.update({
        where: {
          id_transaksi: id_transaksi,
        },
        data: {
          status_Pembayaran: "DIBATALKAN",
        },
        select: {
          detail_transaksi: {
            select: {
              id_barang: true,
            },
          },
        },
      }),

      tx.barang.updateMany({
        where: {
          id_barang: {
            in: listIdBarang,
          },
        },
        data: {
          status: "TERSEDIA",
        },
      }),
    ]);
  });
};

const updateStatusByCS = async (id_transaksi, status) => {
  id_transaksi = validate(getTransaksiValidation, id_transaksi);

  const transaksi = await prismaClient.transaksi.update({
    where: {
      id_transaksi: id_transaksi,
    },
    data: {
      status_Pembayaran: status,
    },
    select: {
      detail_transaksi: {
        select: {
          id_barang: true,
        },
      },
    },
  });

  const listIdBarang = transaksi.detail_transaksi.map((detail) => {
    return detail.id_barang;
  });

  if (status === "DIBATALKAN") {
    await prismaClient.barang.updateMany({
      where: {
        id_barang: {
          in: listIdBarang,
        },
      },
      data: {
        status: "TERSEDIA",
      },
    });
  }

  return "OK";
};

const checkExpiredTransactions = async () => {
  try {
    const now = new Date();
    const result = await prismaClient.$transaction(async (tx) => {
      const expiredTransactions = await tx.transaksi.findMany({
        where: {
          AND: [
            {
              batas_pembayaran: {
                lte: now,
              },
            },
            {
              status_Pembayaran: "BELUM_DIBAYAR",
            },
          ],
        },
        include: {
          detail_transaksi: true,
        },
      });

      logger.log(expiredTransactions);

      if (expiredTransactions.length > 0) {
        const listIdTransaksi = expiredTransactions.map((transaksi) => {
          return transaksi.id_transaksi;
        });

        const listIdBarang = expiredTransactions
          .map((transaksi) => {
            return transaksi.detail_transaksi.map((detail) => {
              return detail.id_barang;
            });
          })
          .flat();

        await Promise.all([
          await tx.transaksi.updateMany({
            where: {
              id_transaksi: {
                in: listIdTransaksi,
              },
            },
            data: {
              status_Pembayaran: "DIBATALKAN",
            },
          }),

          await Promise.all(
            expiredTransactions.map(async (transaksi) => {
              const { poin_loyalitas } = await tx.pembeli.findUnique({
                where: {
                  id_pembeli: transaksi.id_pembeli,
                },
                select: {
                  poin_loyalitas: true,
                },
              });

              await tx.pembeli.update({
                where: {
                  id_pembeli: transaksi.id_pembeli,
                },
                data: {
                  poin_loyalitas: poin_loyalitas + transaksi.potongan_poin,
                },
              });
            })
          ),

          await tx.barang.updateMany({
            where: {
              id_barang: {
                in: listIdBarang,
              },
            },
            data: {
              status: "TERSEDIA",
            },
          }),
        ]);

        return "Transaksi ada dan operasi berhasil!";
      }
      return "Transaksi tidak ada dan operasi berhasil";
    });

    return result;
  } catch (error) {
    return `Operasi gagal, Internal server error ${error}`;
  }
};

export default {
  create,
  get,
  checkExpiredTransactions,
  updateBuktiPembayaranByPembeli,
  updateExpiredPayment,
  updateStatusByCS,
};
