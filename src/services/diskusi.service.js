import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idToInteger } from "../utils/formater.util.js";
import {
  createDiskusiValidation,
  getDiskusiValidation,
  updateDiskusiValidation,
} from "../validation/diskusi.validate.js";
import { validate } from "../validation/validate.js";

const create = async (req) => {
  request = validate(createDiskusiValidation, req);
  request.id_barang = idToInteger(request.id_barang);

  return prismaClient.diskusi.create({
    data: request,
    include: {
      barang: true,
    },
  });
};

const get = async (id) => {
  const id_diskusi = validate(getDiskusiValidation, id);

  const diskusi = await prismaClient.diskusi.findUnique({
    where: {
      id_diskusi: id_diskusi,
    },
    include: {
      barang: true,
    },
  });

  if (!diskusi) {
    throw new ResponseError(404, "Diskusi tidak ditemukan");
  }

  return diskusi;
};

const getList = async (query) => {
  let listDiskusi;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;
  const q = query.search || null;
  if (q !== null) {
    listDiskusi = await prismaClient.diskusi.findMany({
      where: {
        OR: [
          {
            id_diskusi: {
              contains: q,
            },
          },
          {
            barang: {
              nama_barang: {
                contains: q,
              },
            },
          },
          {
            tanggal_diskusi: {
              contains: q,
            },
          },
        ],
      },
      include: {
        barang: true,
      },
      skip: skip,
      take: limit,
    });
  } else {
    listDiskusi = await prismaClient.diskusi.findMany({
      skip: skip,
      take: limit,
    });
  }

  return listDiskusi;
};

export default {
  create,
  get,
  getList,
};
