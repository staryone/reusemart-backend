import { parse } from "path";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idToInteger, idToString } from "../utils/formater.util.js";
import { getIdAuthValidation } from "../validation/auth.validate.js";
// import {
//   createPengirimanValidation,
//   getPengirimanValidation,
//   updatePengirimanValidation,
// } from "../validation/pengiriman.validate.js";
import { validate } from "../validation/validate.js";

// const create = async (request) => {
//   const pengiriman = validate(createPengirimanValidation, request);

//   const createdPengiriman = await prismaClient.pengiriman.create({
//     data: {
//       id_pengiriman: pengiriman.id_pengiriman,
//       tanggal: pengiriman.tanggal,
//       status_pengiriman: pengiriman.status_pengiriman,
//       id_kurir: pengiriman.id_kurir,
//       id_transaksi: pengiriman.id_transaksi,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   });

//   return {
//     id_pengiriman: idToString(createdPengiriman.id_pengiriman),
//     tanggal: createdPengiriman.tanggal,
//     status_pengiriman: createdPengiriman.status_pengiriman,
//     id_kurir: idToString(createdPengiriman.id_kurir),
//     id_transaksi: idToString(createdPengiriman.id_transaksi),
//     createdAt: createdPengiriman.createdAt,
//     updatedAt: createdPengiriman.updatedAt,
//   };
// };

// const get = async (id) => {
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

//   return {
//     id_pengiriman: idToString(pengiriman.id_pengiriman),
//     tanggal: pengiriman.tanggal,
//     status_pengiriman: pengiriman.status_pengiriman,
//     id_kurir: idToString(pengiriman.id_kurir),
//     id_transaksi: idToString(pengiriman.id_transaksi),
//     createdAt: pengiriman.createdAt,
//     updatedAt: pengiriman.updatedAt,
//   };
// };

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
          select: {
            id_transaksi: true,
            tanggal_transaksi: true,
            tanggal_pembayaran: true,
            metode_pengiriman: true,
            status_Pembayaran: true,
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
          select: {
            id_transaksi: true,
            tanggal_transaksi: true,
            tanggal_pembayaran: true,
            metode_pengiriman: true,
            status_Pembayaran: true,
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
  const id_pengiriman = parseInt(request.id_pengiriman, 10);
  request.tanggal = new Date(request.tanggal).toISOString();
  request.id_kurir = idToInteger(request.id_kurir);

  const pengiriman = await prismaClient.pengiriman.findUnique({
    where: {
      id_pengiriman: id_pengiriman,
    },
  });

  if (!pengiriman) {
    throw new ResponseError(404, "Pengiriman tidak ditemukan");
  }

  const updatedPengiriman = await prismaClient.pengiriman.update({
    where: {
      id_pengiriman: id_pengiriman,
    },
    data: {
      tanggal: request.tanggal,
      status_pengiriman: "SEDANG_DIKIRIM",
      id_kurir: request.id_kurir,
      updatedAt: new Date(),
    },
  });

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
  // update,
  // destroy,
};
