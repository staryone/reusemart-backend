import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idToString } from "../utils/formater.util.js";
import {
  createDonasiValidation,
  getDonasiValidation,
  updateDonasiValidation,
} from "../validation/donasi.validate.js";
import { validate } from "../validation/validate.js";
import penitipService from "./penitip.service.js";

const create = async (request) => {
  request = validate(createDonasiValidation, request);

  const barang = await prismaClient.barang.findUnique({
    where: {
      id_barang: request.id_barang,
    },
    select: {
      harga: true,
    },
  });

  request.poin_penitip = barang.harga / 10000;

  return prismaClient.donasi.create({
    data: request,
  });
};

const get = async (id) => {
  const id_donasi = validate(getDonasiValidation, id);

  const donasi = await prismaClient.donasi.findUnique({
    where: {
      id_donasi: id_donasi,
    },
    include: {
      barang: true,
    },
  });

  if (!donasi) {
    throw new ResponseError(404, "Donasi tidak ditemukan");
  }

  donasi.id_barang = idToString(donasi.barang.prefix, donasi.id_barang);

  delete donasi.barang;

  return donasi;
};

const getList = async (query, id_organisasi) => {
  let listDonasi;
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;
  const q = query.search || null;

  const countAllReqDonasi = await prismaClient.donasi.count({
    where: {
      request: {
        id_organisasi: id_organisasi,
      },
    },
  });

  if (q !== null) {
    listDonasi = await prismaClient.donasi.findMany({
      where: {
        AND: [
          {
            request: {
              id_organisasi: id_organisasi,
            },
          },
          {
            OR: [
              {
                deskripsi: {
                  contains: q,
                },
              },
              {
                status: {
                  contains: q,
                },
              },
            ],
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
    listDonasi = await prismaClient.donasi.findMany({
      where: {
        request: {
          id_organisasi: id_organisasi,
        },
      },
      include: {
        barang: true,
      },
      skip: skip,
      take: limit,
    });
  }

  const formattedDonasi = listDonasi.map((donasi) => {
    donasi.id_barang = idToString(donasi.barang.prefix, donasi.id_barang);

    delete donasi.barang;

    return donasi;
  });

  return [formattedDonasi, countAllReqDonasi];
};

const update = async (request) => {
  const updateRequest = validate(updateDonasiValidation, request);

  const data = await prismaClient.donasi.findUnique({
    where: {
      id_donasi: updateRequest.id_donasi,
    },
  });

  if (!data) {
    throw new ResponseError(404, "Donasi tidak ditemukan!");
  }

  if (updateRequest.tanggal_donasi) {
    data.tanggal_donasi = new Date(updateRequest.tanggal_donasi);
  }

  if (updateRequest.nama_penerima) {
    data.nama_penerima = new Date(updateRequest.nama_penerima);
  }

  return prismaClient.donasi.update({
    where: {
      id_donasi: data.id_donasi,
    },
    data: data,
  });
};

export default {
  create,
  get,
  getList,
  update,
};
