import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idOrgToInteger, idToString } from "../utils/formater.util.js";
import {
  createDonasiValidation,
  getDonasiValidation,
  updateDonasiValidation,
} from "../validation/donasi.validate.js";
import { validate } from "../validation/validate.js";
import barangService from "./barang.service.js";

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

  await prismaClient.requestDonasi.update({
    where: {
      id_request: request.id_request,
    },
    data: {
      status: "DISETUJUI",
    },
  });

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
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;
  const q = query.search;

  if (typeof id_organisasi !== "string") {
    throw new ResponseError(400, "Id organisasi tidak valid!");
  }

  id_organisasi = idOrgToInteger(id_organisasi);

  const countAllReqDonasi = await prismaClient.donasi.count({
    where: {
      AND: [
        {
          request: {
            id_organisasi: id_organisasi,
          },
        },
        q
          ? {
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
            }
          : {},
      ],
    },
  });
  const listDonasi = await prismaClient.donasi.findMany({
    where: {
      AND: [
        {
          request: {
            id_organisasi: id_organisasi,
          },
        },
        q
          ? {
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
            }
          : {},
      ],
    },
    include: {
      barang: true,
    },
    skip: skip,
    take: limit,
  });

  const formattedDonasi = listDonasi.map((donasi) => {
    donasi.id_barang = idToString(donasi.barang.prefix, donasi.id_barang);

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
    data.nama_penerima = updateRequest.nama_penerima;
  }

  if (updateRequest.status) {
    await barangService.updateStatus({
      id_barang: data.id_barang,
      status: updateRequest.status,
    });
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
