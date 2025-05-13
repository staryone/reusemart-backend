import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idToInteger, idToString } from "../utils/formater.util.js";
import {
  createDiskusiValidation,
  getDiskusiValidation,
} from "../validation/diskusi.validate.js";
import { validate } from "../validation/validate.js";

const create = async (req) => {
  const request = validate(createDiskusiValidation, req);
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
      user: {
        include: {
          pegawai: {
            include: {
              jabatan: true,
            },
          },
          pembeli: true,
        },
      },
    },
  });

  if (!diskusi) {
    throw new ResponseError(404, "Diskusi tidak ditemukan");
  }

  const formattedDiskusi = {
    id_diskusi: diskusi.id_diskusi,
    tanggal_diskusi: diskusi.tanggal_diskusi,
    pesan: diskusi.pesan,
    id_barang: idToString(diskusi.barang.prefix, diskusi.barang.id_barang),
    id_cs: diskusi.user.pegawai
      ? idToString(diskusi.user.pegawai.prefix, diskusi.user.pegawai.id_pegawai)
      : null,
    id_pembeli: diskusi.user.pembeli ? diskusi.user.pembeli.id_pembeli : null,
    nama: diskusi.user.pegawai
      ? diskusi.user.pegawai.nama
      : diskusi.user.pembeli.nama,
    role: diskusi.user.pegawai
      ? String(diskusi.user.pegawai.jabatan.nama_jabatan).toUpperCase()
      : diskusi.user.role,
  };

  return formattedDiskusi;
};

const getList = async (query) => {
  let listDiskusi;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;
  const q = query.search;

  const countAllDiskusi = await prismaClient.diskusi.count({
    where: q
      ? {
          barang: {
            nama_barang: {
              contains: q,
            },
          },
        }
      : {},
  });
  listDiskusi = await prismaClient.diskusi.findMany({
    where: q
      ? {
          barang: {
            nama_barang: {
              contains: q,
            },
          },
        }
      : {},
    include: {
      barang: true,
      user: {
        include: {
          pegawai: {
            include: {
              jabatan: true,
            },
          },
          pembeli: true,
        },
      },
    },
    skip: skip,
    take: limit,
  });

  const formattedDiskusi = listDiskusi.map((diskusi) => {
    return {
      id_diskusi: diskusi.id_diskusi,
      tanggal_diskusi: diskusi.tanggal_diskusi,
      pesan: diskusi.pesan,
      id_barang: idToString(diskusi.barang.prefix, diskusi.barang.id_barang),
      id_cs: diskusi.user.pegawai
        ? idToString(
            diskusi.user.pegawai.prefix,
            diskusi.user.pegawai.id_pegawai
          )
        : null,
      id_pembeli: diskusi.user.pembeli ? diskusi.user.pembeli.id_pembeli : null,
      nama: diskusi.user.pegawai
        ? diskusi.user.pegawai.nama
        : diskusi.user.pembeli.nama,
      role: diskusi.user.pegawai
        ? String(diskusi.user.pegawai.jabatan.nama_jabatan).toUpperCase()
        : diskusi.user.role,
    };
  });

  return [formattedDiskusi, countAllDiskusi];
};

const getListByIdBarang = async (query, id_barang) => {
  let listDiskusi;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const countAllDiskusi = await prismaClient.diskusi.count({
    where: {
      id_barang: id_barang,
    },
  });
  listDiskusi = await prismaClient.diskusi.findMany({
    where: {
      id_barang: id_barang,
    },
    include: {
      barang: true,
      user: {
        include: {
          pegawai: {
            include: {
              jabatan: true,
            },
          },
          pembeli: true,
        },
      },
    },
    skip: skip,
    take: limit,
  });

  const formattedDiskusi = listDiskusi.map((diskusi) => {
    return {
      id_diskusi: diskusi.id_diskusi,
      tanggal_diskusi: diskusi.tanggal_diskusi,
      pesan: diskusi.pesan,
      id_barang: idToString(diskusi.barang.prefix, diskusi.barang.id_barang),
      id_cs: diskusi.user.pegawai
        ? idToString(
            diskusi.user.pegawai.prefix,
            diskusi.user.pegawai.id_pegawai
          )
        : null,
      id_pembeli: diskusi.user.pembeli ? diskusi.user.pembeli.id_pembeli : null,
      nama: diskusi.user.pegawai
        ? diskusi.user.pegawai.nama
        : diskusi.user.pembeli.nama,
      role: diskusi.user.pegawai
        ? String(diskusi.user.pegawai.jabatan.nama_jabatan).toUpperCase()
        : diskusi.user.role,
    };
  });

  return [formattedDiskusi, countAllDiskusi];
};

export default {
  create,
  get,
  getList,
  getListByIdBarang,
};
