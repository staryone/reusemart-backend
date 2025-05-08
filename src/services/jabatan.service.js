import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import {
  createJabatanValidation,
  getJabatanValidation,
  updateJabatanValidation,
} from "../validation/jabatan.validate.js";
import { validate } from "../validation/validate.js";

const create = async (nama) => {
  nama = validate(createJabatanValidation, nama);
  const nama_jabatan =
    String(nama).charAt(0).toUpperCase() + String(nama).slice(1).toLowerCase();

  const countJabatan = await prismaClient.jabatan.count({
    where: {
      nama_jabatan: nama_jabatan,
    },
  });

  if (countJabatan >= 1) {
    throw new ResponseError(400, "Jabatan sudah terdaftar!");
  }

  return prismaClient.jabatan.create({
    data: {
      nama_jabatan: nama_jabatan,
    },
  });
};

const get = async (id) => {
  const id_jabatan = validate(getJabatanValidation, id);

  const jabatan = await prismaClient.jabatan.findUnique({
    where: {
      id_jabatan: id_jabatan,
    },
  });

  if (!jabatan) {
    throw new ResponseError(404, "Jabatan tidak ditemukan");
  }

  return jabatan;
};

const getList = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;
  const q = query.search;

  const countAllJabatan = await prismaClient.jabatan.count({
    where: q
      ? {
          nama_jabatan: {
            contains: q,
          },
        }
      : {},
  });
  const listJabatan = await prismaClient.jabatan.findMany({
    where: q
      ? {
          nama_jabatan: {
            contains: q,
          },
        }
      : {},
    skip: skip,
    take: limit,
  });

  return [listJabatan, countAllJabatan];
};

const update = async (request) => {
  const updateRequest = validate(updateJabatanValidation, request);
  const nama_jabatan =
    String(updateRequest.nama_jabatan).charAt(0).toUpperCase() +
    String(updateRequest.nama_jabatan).slice(1).toLowerCase();

  const data = await prismaClient.jabatan.findUnique({
    where: {
      id_jabatan: updateRequest.id_jabatan,
    },
  });

  if (!data) {
    throw new ResponseError(404, "Jabatan tidak ditemukan!");
  }

  const countJabatan = await prismaClient.jabatan.count({
    where: {
      nama_jabatan: nama_jabatan,
    },
  });

  if (countJabatan >= 1) {
    throw new ResponseError(400, "Nama jabatan tidak boleh sama!");
  }

  data.nama_jabatan = nama_jabatan;

  return prismaClient.jabatan.update({
    where: {
      id_jabatan: data.id_jabatan,
    },
    data: data,
  });
};

const destroy = async (id) => {
  const id_jabatan = validate(getJabatanValidation, id);

  const jabatan = await prismaClient.jabatan.findUnique({
    where: {
      id_jabatan: id_jabatan,
    },
  });

  if (!jabatan) {
    throw new ResponseError(404, "Jabatan tidak ditemukan!");
  }

  const listPegawai = await prismaClient.pegawai.findMany({
    where: {
      jabatan: {
        id_jabatan: id_jabatan,
      },
    },
  });

  const listIdToDelete = listPegawai.map((p) => {
    return p.id_user;
  });

  const deletedPegawai = prismaClient.pegawai.deleteMany({
    where: {
      id_jabatan: id_jabatan,
    },
  });

  const deletedUser = prismaClient.user.deleteMany({
    where: {
      id_user: {
        in: listIdToDelete,
      },
    },
  });

  const deletedJabatan = prismaClient.jabatan.delete({
    where: {
      id_jabatan: id_jabatan,
    },
  });

  const result = prismaClient.$transaction([
    deletedPegawai,
    deletedUser,
    deletedJabatan,
  ]);

  return result;
};

export default {
  create,
  get,
  getList,
  update,
  destroy,
};
