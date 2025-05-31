import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idToInteger, idToString } from "../utils/formater.util.js";
import { getIdAuthValidation } from "../validation/auth.validate.js";
import {
  createPengirimanValidation,
  getPengirimanValidation,
  updatePengirimanValidation,
} from "../validation/pengiriman.validate.js";
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

const get = async (id) => {
  id = validate(getPengirimanValidation, id);
  const id_pengiriman = idToInteger(id);

  const pengiriman = await prismaClient.pengiriman.findUnique({
    where: {
      id_pengiriman: id_pengiriman,
    },
  });

  if (!pengiriman) {
    throw new ResponseError(404, "Pengiriman tidak ditemukan");
  }

  return {
    id_pengiriman: idToString(pengiriman.id_pengiriman),
    tanggal: pengiriman.tanggal,
    status_pengiriman: pengiriman.status_pengiriman,
    id_kurir: idToString(pengiriman.id_kurir),
    id_transaksi: idToString(pengiriman.id_transaksi),
    createdAt: pengiriman.createdAt,
    updatedAt: pengiriman.updatedAt,
  };
};

const getList = async (request) => {
  const filter = validate(getPengirimanListValidation, request);
  const page = parseInt(filter.page) || 1;
  const limit = parseInt(filter.limit) || 10;
  const skip = (page - 1) * limit;
  const q = filter.search;

  const whereClause = q
    ? {
        OR: [
          { status_pengiriman: { contains: q } },
          { id_kurir: parseInt(q) || undefined },
          { id_transaksi: parseInt(q) || undefined },
        ].filter((condition) => condition !== undefined),
      }
    : {};

  const countAllPengiriman = await prismaClient.pengiriman.count({
    where: whereClause,
  });

  const listPengiriman = await prismaClient.pengiriman.findMany({
    where: whereClause,
    skip: skip,
    take: limit,
    orderBy: {
      updatedAt: "desc",
    },
  });

  const formattedPengiriman = listPengiriman.map((p) => ({
    id_pengiriman: idToString(p.id_pengiriman),
    tanggal: p.tanggal,
    status_pengiriman: p.status_pengiriman,
    id_kurir: idToString(p.id_kurir),
    id_transaksi: idToString(p.id_transaksi),
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));

  return [formattedPengiriman, countAllPengiriman];
};

const update = async (request) => {
  const updateRequest = validate(updatePengirimanValidation, request);
  const id_pengiriman = idToInteger(updateRequest.id_pengiriman);

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
      tanggal: updateRequest.tanggal || pengiriman.tanggal,
      status_pengiriman:
        updateRequest.status_pengiriman || pengiriman.status_pengiriman,
      id_kurir: updateRequest.id_kurir || pengiriman.id_kurir,
      id_transaksi: updateRequest.id_transaksi || pengiriman.id_transaksi,
      updatedAt: new Date(),
    },
  });

  return {
    id_pengiriman: idToString(updatedPengiriman.id_pengiriman),
    tanggal: updatedPengiriman.tanggal,
    status_pengiriman: updatedPengiriman.status_pengiriman,
    id_kurir: idToString(updatedPengiriman.id_kurir),
    id_transaksi: idToString(updatedPengiriman.id_transaksi),
    createdAt: updatedPengiriman.createdAt,
    updatedAt: updatedPengiriman.updatedAt,
  };
};

const destroy = async (id) => {
  id = validate(getPengirimanValidation, id);
  const id_pengiriman = idToInteger(id);

  const pengiriman = await prismaClient.pengiriman.findUnique({
    where: {
      id_pengiriman: id_pengiriman,
    },
  });

  if (!pengiriman) {
    throw new ResponseError(404, "Pengiriman tidak ditemukan");
  }

  await prismaClient.pengiriman.delete({
    where: {
      id_pengiriman: id_pengiriman,
    },
  });

  return { message: "Pengiriman deleted successfully" };
};

export default {
  //   create,
  get,
  getList,
  update,
  destroy,
};
