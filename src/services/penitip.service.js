import { prismaClient } from "../application/database.js";
import { deleteFile, getUrlFile, uploadFile } from "../application/storage.js";
import { ResponseError } from "../errors/response.error.js";
import {
  formatImageName,
  idToInteger,
  idToString,
} from "../utils/formater.util.js";
import { getIdAuthValidation } from "../validation/auth.validate.js";
import {
  createPenitipValidation,
  getPenitipValidation,
  updatePenitipValidation,
  updateSistemPenitipValidation,
} from "../validation/penitip.validate.js";
import { validate } from "../validation/validate.js";

const create = async (request) => {
  const penitip = validate(createPenitipValidation, request);

  const foto_ktp = penitip.foto_ktp[0];
  penitip.foto_ktp = "foto_ktp/" + formatImageName(penitip.nomor_ktp);
  "." + String(penitip.foto_ktp.mimetype).slice(6);
  foto_ktp.fieldname = formatImageName(penitip.nomor_ktp);

  const [createdPenitip, _] = await Promise.all([
    prismaClient.penitip.create({
      data: penitip,
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    }),
    uploadFile(foto_ktp, "foto_ktp"),
  ]);

  const formattedPenitip = {
    id_penitip: idToString(createdPenitip.prefix, createdPenitip.id_penitip),
    email: createdPenitip.user.email,
    nomor_ktp: createdPenitip.nomor_ktp,
    foto_ktp: createdPenitip.foto_ktp,
    nama: createdPenitip.nama,
    alamat: createdPenitip.alamat,
    nomor_telepon: createdPenitip.nomor_telepon,
    saldo: createdPenitip.saldo,
    rating: createdPenitip.rating,
    total_review: createdPenitip.total_review,
    jumlah_review: createdPenitip.jumlah_review,
    is_top_seller: createdPenitip.is_top_seller,
    total_per_bulan: createdPenitip.total_per_bulan,
    poin: createdPenitip.poin,
  };

  return formattedPenitip;
};

const profile = async (id) => {
  const id_user = validate(getIdAuthValidation, id);

  const penitip = await prismaClient.penitip.findUnique({
    where: {
      id_user: id_user,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      penitipan: {
        select: {
          id_penitipan: true,
          detail_penitipan: {
            include: {
              barang: {
                include: {
                  gambar: true,
                  detail_transaksi: {
                    include: {
                      transaksi: {
                        include: {
                          pengiriman: true,
                        },
                      },
                    },
                  },
                  kategori: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!penitip) {
    throw new ResponseError(404, "Penitip tidak ditemukan");
  }

  try {
    await Promise.all(
      penitip.penitipan.map(async (penitipan) => {
        penitipan.detail_penitipan = await Promise.all(
          penitipan.detail_penitipan.map(async (dtl) => {
            dtl.barang.gambar = await Promise.all(
              dtl.barang.gambar.map(async (g) => {
                return {
                  url_gambar: await getUrlFile(g.url_gambar),
                  is_primary: g.is_primary,
                };
              })
            );
            return dtl;
          })
        );
      })
    );
  } catch {}

  const formattedPenitip = {
    id_penitip: idToString(penitip.prefix, penitip.id_penitip),
    email: penitip.user.email,
    nomor_ktp: penitip.nomor_ktp,
    foto_ktp: penitip.foto_ktp,
    nama: penitip.nama,
    alamat: penitip.alamat,
    nomor_telepon: penitip.nomor_telepon,
    saldo: penitip.saldo,
    rating: penitip.rating,
    total_review: penitip.total_review,
    jumlah_review: penitip.jumlah_review,
    is_top_seller: penitip.is_top_seller,
    total_per_bulan: penitip.total_per_bulan,
    poin: penitip.poin,
    penitipan: penitip.penitipan.map((penitipan) => ({
      id_penitipan: penitipan.id_penitipan,
      detail_penitipan: penitipan.detail_penitipan.map((dtl) => ({
        id_dtl_penitipan: dtl.id_dtl_penitipan,
        tanggal_masuk: dtl.tanggal_masuk.toISOString(),
        tanggal_akhir: dtl.tanggal_akhir.toISOString(),
        tanggal_laku: dtl.tanggal_laku ? dtl.tanggal_laku.toISOString() : null,
        batas_ambil: dtl.batas_ambil ? dtl.batas_ambil.toISOString() : null,
        is_perpanjang: dtl.is_perpanjang,
        barang: {
          id_barang: idToString(dtl.barang.prefix, dtl.barang.id_barang),
          nama_barang: dtl.barang.nama_barang,
          harga: dtl.barang.harga,
          status: dtl.barang.status,
          deskripsi: dtl.barang.deskripsi,
          garansi: dtl.barang.garansi ? dtl.barang.garansi.toISOString() : null,
          berat: dtl.barang.berat,
          updatedAt: dtl.barang.updatedAt
            ? dtl.barang.updatedAt.toISOString()
            : null,
          gambar: dtl.barang.gambar,
          kategori: {
            nama_kategori: dtl.barang.kategori.nama_kategori,
          },
        },
      })),
    })),
    detail_transaksi: penitip.penitipan
      .map((penitipan) =>
        penitipan.detail_penitipan
          .map((dtl_penitipan) =>
            dtl_penitipan.barang?.detail_transaksi
              ? dtl_penitipan.barang.detail_transaksi
              : null
          )
          .filter((transaksi) => transaksi !== null)
      )
      .flat(),
  };

  return formattedPenitip;
};

const getHistoryPenjualan = async (id) => {
  const id_user = validate(getIdAuthValidation, id);

  const transactions = await prismaClient.detailTransaksi.findMany({
    where: {
      AND: [
        {
          transaksi: {
            pengiriman: {
              status_pengiriman: "SUDAH_DITERIMA",
            },
          },
        },
        {
          barang: {
            detail_penitipan: {
              penitipan: {
                penitip: { id_user },
              },
            },
          },
        },
      ],
    },
    select: {
      id_dtl_transaksi: true,
      poin: true,
      komisi_penitip: true,
      barang: {
        select: {
          id_barang: true,
          nama_barang: true,
          harga: true,
          detail_penitipan: {
            select: {
              tanggal_masuk: true,
              tanggal_laku: true,
            },
          },
        },
      },
      transaksi: {
        select: {
          id_transaksi: true,
          tanggal_transaksi: true,
          total_harga: true,
          total_akhir: true,
          status_Pembayaran: true,
          pembeli: { select: { nama: true } },
          pengiriman: {
            select: {
              tanggal: true,
              status_pengiriman: true,
            },
          },
        },
      },
    },
  });

  return transactions;
};

const get = async (id) => {
  id = validate(getPenitipValidation, id);
  const id_penitip = idToInteger(id);

  const penitip = await prismaClient.penitip.findUnique({
    where: {
      id_penitip: id_penitip,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!penitip) {
    throw new ResponseError(404, "Penitip tidak ditemukan");
  }

  const urlKTP = await getUrlFile(penitip.foto_ktp);

  const formattedPenitip = {
    id_penitip: idToString(penitip.prefix, penitip.id_penitip),
    email: penitip.user.email,
    nomor_ktp: penitip.nomor_ktp,
    foto_ktp: urlKTP,
    nama: penitip.nama,
    alamat: penitip.alamat,
    nomor_telepon: penitip.nomor_telepon,
    saldo: penitip.saldo,
    rating: penitip.rating,
    total_review: penitip.total_review,
    jumlah_review: penitip.jumlah_review,
    is_top_seller: penitip.is_top_seller,
    total_per_bulan: penitip.total_per_bulan,
    poin: penitip.poin,
  };

  return formattedPenitip;
};

const getList = async (request) => {
  const page = parseInt(request.page) || 1;
  const limit = parseInt(request.limit) || 10;
  const skip = request.all ? undefined : (page - 1) * limit;
  const q = request.search;

  const countAllPenitip = await prismaClient.penitip.count({
    where: q
      ? {
          OR: [
            {
              nama: {
                contains: q,
              },
            },
            {
              user: {
                email: {
                  contains: q,
                },
              },
            },
            {
              nomor_ktp: {
                contains: q,
              },
            },
          ],
        }
      : {},
  });

  const findManyOptions = {
    where: q
      ? {
          OR: [
            {
              nama: {
                contains: q,
              },
            },
            {
              user: {
                email: {
                  contains: q,
                },
              },
            },
            {
              nomor_ktp: {
                contains: q,
              },
            },
          ],
        }
      : {},
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  };

  if (!request.all && skip !== undefined && limit !== undefined) {
    findManyOptions.skip = skip;
    findManyOptions.take = limit;
  }

  const listPenitip = await prismaClient.penitip.findMany(findManyOptions);

  const formattedPenitip = await Promise.all(
    listPenitip.map(async (p) => ({
      id_penitip: idToString(p.prefix, p.id_penitip),
      email: p.user.email,
      nomor_ktp: p.nomor_ktp,
      foto_ktp: await getUrlFile(p.foto_ktp),
      nama: p.nama,
      alamat: p.alamat,
      nomor_telepon: p.nomor_telepon,
      saldo: p.saldo,
      rating: p.rating,
      total_review: p.total_review,
      jumlah_review: p.jumlah_review,
      is_top_seller: p.is_top_seller,
      total_per_bulan: p.total_per_bulan,
      poin: p.poin,
    }))
  );

  return [formattedPenitip, countAllPenitip];
};

const update = async (request) => {
  const updateRequest = validate(updatePenitipValidation, request);
  const id = idToInteger(updateRequest.id_penitip);

  const data = await prismaClient.penitip.findUnique({
    where: {
      id_penitip: id,
    },
  });

  if (!data) {
    throw new ResponseError(404, "Penitip tidak ditemukan!");
  }

  if (updateRequest.nomor_ktp || updateRequest.foto_ktp) {
    if (!updateRequest.foto_ktp) {
      throw new ResponseError(404, "Wajib menyertakan foto ktp!");
    }

    if (!updateRequest.nomor_ktp) {
      throw new ResponseError(404, "Wajib menyertakan nomor ktp!");
    }

    await deleteFile(data.foto_ktp);

    updateRequest.foto_ktp.fieldname = formatImageName(data.nomor_ktp);

    await uploadFile(updateRequest.foto_ktp, "foto_ktp");

    data.foto_ktp =
      "foto_ktp/" +
      formatImageName(updateRequest.nomor_ktp) +
      "." +
      String(updateRequest.foto_ktp.mimetype).slice(6);
  }

  if (updateRequest.nama) {
    data.nama = updateRequest.nama;
  }

  if (updateRequest.alamat) {
    data.alamat = updateRequest.alamat;
  }

  if (updateRequest.nomor_telepon) {
    data.nomor_telepon = updateRequest.nomor_telepon;
  }

  if (updateRequest.email) {
    await prismaClient.user.update({
      where: {
        id_user: data.id_user,
      },
      data: {
        email: updateRequest.email,
      },
    });
  }

  return await prismaClient.penitip.update({
    where: {
      id_penitip: id,
    },
    data: data,
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });
};

const updateSistem = async (req) => {
  req = validate(updateSistemPenitipValidation, req);

  const id_penitip = idToInteger(req.id_penitip);

  const penitip = await prismaClient.penitip.findUnique({
    where: {
      id_penitip: id_penitip,
    },
  });

  if (req.saldo) {
    penitip.saldo = penitip.saldo + req.saldo;
  }
  if (req.total_review) {
    penitip.total_review = penitip.total_review + req.total_review;
  }
  if (req.jumlah_review) {
    penitip.jumlah_review = penitip.jumlah_review + req.jumlah_review;
  }

  if (req.total_per_bulan) {
    penitip.total_per_bulan = req.total_per_bulan;
  }
  if (req.is_top_seller) {
    penitip.is_top_seller = req.is_top_seller;
  }

  if (req.poin) {
    penitip.poin = penitip.poin + req.poin;
  }

  penitip.rating = penitip.total_review / penitip.jumlah_review;

  return prismaClient.penitip.update({
    where: {
      id_penitip: id_penitip,
    },
    data: penitip,
  });
};

const destroy = async (id) => {
  id = validate(getPenitipValidation, id);
  const id_penitip = idToInteger(id);

  const penitip = await prismaClient.penitip.findUnique({
    where: {
      id_penitip: id_penitip,
    },
    include: {
      user: true,
    },
  });

  if (!penitip) {
    throw new ResponseError(404, "Penitip tidak ditemukan!");
  }

  const deletedPenitip = prismaClient.penitip.delete({
    where: {
      id_penitip: penitip.id_penitip,
    },
  });

  const deletedUser = prismaClient.user.delete({
    where: {
      id_user: penitip.user.id_user,
    },
  });

  await deleteFile(penitip.foto_ktp);

  return prismaClient.$transaction([deletedPenitip, deletedUser]);
};

const topSeller = async () => {
  const now = new Date();
  const previousMonth = new Date(now);
  previousMonth.setMonth(now.getMonth() - 1);
  const startOfMonth = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  // Fetch data
  const detailPenitipan = await prismaClient.detailPenitipan.findMany({
    where: {
      tanggal_laku: {
        not: null,
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    include: {
      barang: {
        select: {
          harga: true,
        },
      },
      penitipan: {
        include: {
          penitip: {
            select: {
              id_penitip: true,
            },
          },
        },
      },
    },
  });

  if (!detailPenitipan) {
    return "Tidak ada hasil";
  }

  // Aggregate harga by id_penitip
  const totalsByPenitip = detailPenitipan.reduce((acc, detail) => {
    const idPenitip = detail.penitipan.penitip.id_penitip;
    const harga = detail.barang.harga;

    if (!acc[idPenitip]) {
      acc[idPenitip] = 0;
    }
    acc[idPenitip] += harga;

    return acc;
  }, {});

  // Find the id_penitip with the highest total harga
  let topPenitip = null;
  let maxTotal = 0;

  for (const [idPenitip, total] of Object.entries(totalsByPenitip)) {
    if (total > maxTotal) {
      maxTotal = total;
      topPenitip = idPenitip;
    }
  }

  console.log("\n\nTotals", totalsByPenitip);

  const calonTopSeller = await prismaClient.penitip.findUnique({
    where: {
      id_penitip: Number(topPenitip),
    },
  });

  const currentTopSeller = await prismaClient.penitip.findFirst({
    where: {
      is_top_seller: true,
    },
  });

  const bonus = 0.01 * maxTotal;

  const updateNewTopSeller = await prismaClient.penitip.update({
    where: {
      id_penitip: calonTopSeller.id_penitip,
    },
    data: {
      is_top_seller: true,
      saldo: calonTopSeller.saldo + bonus,
    },
  });

  const removePreviousTopSeller = await prismaClient.penitip.update({
    where: {
      id_penitip: currentTopSeller.id_penitip,
    },
    data: {
      is_top_seller: false,
    },
  });

  return {
    id_penitip: topPenitip ? Number(topPenitip) : null,
    total_harga: maxTotal,
  };
};

export default {
  create,
  profile,
  get,
  getList,
  getHistoryPenjualan,
  update,
  updateSistem,
  destroy,
  topSeller,
};
