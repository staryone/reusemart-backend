import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import {
  createPegawaiValidation,
  getPegawaiValidation,
  updatePegawaiValidation,
} from "../validation/pegawai.validate.js";
import { validate } from "../validation/validate.js";
import bcrypt from "bcrypt";

const create = async (request) => {
  const pegawai = validate(createPegawaiValidation, request);

  return prismaClient.pegawai.create({
    data: pegawai,
  });
};

const get = async (email) => {
  email = validate(getPegawaiValidation, email);

  const pegawai = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      pegawai: {
        select: {
          prefix: true,
          id_pegawai: true,
          nama: true,
          nomor_telepon: true,
          komisi: true,
          tgl_lahir: true,
          jabatan: true,
        },
      },
    },
  });

  if (!pegawai) {
    throw new ResponseError(404, "Pegawai tidak ditemukan");
  }

  return pegawai;
};

const getList = async () => {
  const listPegawai = await prismaClient.user.findMany({
    where: {
      role: "PEGAWAI",
    },
    select: {
      email: true,
      pegawai: {
        select: {
          prefix: true,
          id_pegawai: true,
          nama: true,
          nomor_telepon: true,
          komisi: true,
          tgl_lahir: true,
          jabatan: true,
        },
      },
    },
  });

  if (!listPegawai) {
    throw new ResponseError(404, "Tidak ada pegawai yang ditemukan!");
  }

  return listPegawai;
};

const update = async (request) => {
  const updateRequest = validate(updatePegawaiValidation, request);

  const data = await prismaClient.user.findUnique({
    where: {
      email: updateRequest.email,
    },
    select: {
      pegawai: true,
    },
  });

  console.log(data);

  if (updateRequest.nama) {
    data.pegawai.nama = updateRequest.nama;
  }

  if (updateRequest.nomor_telepon) {
    data.pegawai.nomor_telepon = updateRequest.nomor_telepon;
  }

  if (updateRequest.komisi) {
    data.pegawai.komisi = updateRequest.komisi;
  }

  if (updateRequest.tgl_lahir) {
    data.pegawai.tgl_lahir = updateRequest.tgl_lahir;
  }

  if (updateRequest.id_jabatan) {
    data.pegawai.id_jabatan = updateRequest.id_jabatan;
  }

  return prismaClient.pegawai.update({
    where: {
      id_pegawai: data.pegawai.id_pegawai,
    },
    data: data.pegawai,
  });
};

const destroy = async (email) => {
  email = validate(getPegawaiValidation, email);

  const user = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
    select: {
      pegawai: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "Pegawai tidak ditemukan!");
  }

  const deletedPegawai = prismaClient.pegawai.delete({
    where: {
      id_pegawai: user.pegawai.id_pegawai,
    },
  });

  const deletedUser = prismaClient.user.delete({
    where: {
      email: email,
    },
  });

  return prismaClient.$transaction([deletedPegawai, deletedUser]);
};

const search = async (keyword) => {
  const listPegawai = await prismaClient.user.findMany({
    where: {
      role: "PEGAWAI",
    },
    select: {
      email: true,
      pegawai: {
        where: {
          OR: [
            {
              nama: {
                contains: keyword,
              },
            },
          ],
        },
        select: {
          prefix: true,
          id_pegawai: true,
          nama: true,
          nomor_telepon: true,
          komisi: true,
          tgl_lahir: true,
        },
      },
    },
  });

  if (!listPegawai) {
    throw new ResponseError(404, "Tidak ada pegawai yang ditemukan!");
  }

  const filteredListPegawai = listPegawai.filter((item) => {
    return item.pegawai !== null;
  });

  return filteredListPegawai;
};

export default { create, get, getList, update, destroy, search };
