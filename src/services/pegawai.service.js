import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import {
  createPegawaiValidation,
  getPegawaiValidation,
} from "../validation/pegawai.validate.js";
import { validate } from "../validation/validate.js";
import { logger } from "../application/logging.js";
import { formatStringDate } from "../utils/date_util.js";

const create = async (request) => {
  const data = validate(createPegawaiValidation, request);

  //   const dataUser = {
  //     email: data.email,
  //     password: await bcrypt.hash(formatStringDate(data.tgl_lahir), 10),
  //     role: "PEGAWAI",
  //   };

  //   const user = await userService.create(dataUser);

  const pegawai = {
    nama: data.nama,
    nomor_telepon: data.nomor_telepon,
    komisi: 0,
    tgl_lahir: data.tgl_lahir,
    id_jabatan: data.id_jabatan,
    id_user: data.id_user,
  };

  return await prismaClient.pegawai.create({
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
    throw new ResponseError(404, "pegawai tidak ditemukan");
  }

  return pegawai;
};

const getAll = async () => {
  const listPegawai = await prismaClient.user.findMany({
    where: {
      role: "PEGAWAI",
    },
    select: {
      email: true,
      pegawai: {
        select: {
          nama: true,
          nomor_telepon: true,
          komisi: true,
          tgl_lahir: true,
          jabatan: {
            select: {
              id_jabatan: true,
              nama_jabatan: true,
            },
          },
        },
      },
    },
  });

  if (!listPegawai) {
    throw new ResponseError(404, "Tidak ada pegawai yang ditemukan!");
  }

  return listPegawai;
};

const update = async () => {};

const remove = async () => {};

const search = async () => {};

// create({
//     email: "test@gmail.com",
//     nama: "Test User",
//     nomor_telepon: "08612812111",
//     tgl_lahir: new Date("2004-12-12"),
//     id_jabatan: 1,
// });

// get("stanyslaushary@reusemart.my.id");

getAll();
