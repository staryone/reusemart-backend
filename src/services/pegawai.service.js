import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idToInteger, idToString } from "../utils/formater.util.js";
import { getIdAuthValidation } from "../validation/auth.validate.js";
import {
  createPegawaiValidation,
  getIdPegawaiValidation,
  updatePegawaiValidation,
} from "../validation/pegawai.validate.js";
import { validate } from "../validation/validate.js";

const create = async (request) => {
  const pegawai = validate(createPegawaiValidation, request);

  const createdPegawai = await prismaClient.pegawai.create({
    data: pegawai,
    include: {
      user: {
        select: {
          email: true,
        },
      },
      jabatan: true,
    },
  });

  const formattedPegawai = {
    id_pegawai: idToString(createdPegawai.prefix, createdPegawai.id_pegawai),
    email: createdPegawai.user.email,
    nama: createdPegawai.nama,
    nomor_telepon: createdPegawai.nomor_telepon,
    komisi: createdPegawai.komisi,
    tgl_lahir: createdPegawai.tgl_lahir,
    jabatan: createdPegawai.jabatan,
  };

  return formattedPegawai;
};

// const profile = async (id) => {
//   const id_user = validate(getIdAuthValidation, id);

//   const pegawai = await prismaClient.pegawai.findUnique({
//     where: {
//       id_user: id_user,
//     },
//     include: {
//       user: {
//         select: {
//           email: true,
//         },
//       },
//       jabatan: true,
//       penitipan_hunter: {
//         include: {
//           detail_penitipan: {
//             include: {
//               barang: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   if (!pegawai) {
//     throw new ResponseError(404, "Pegawai tidak ditemukan");
//   }

//   const formattedPegawai = {
//     id_pegawai: idToString(pegawai.prefix, pegawai.id_pegawai),
//     email: pegawai.user.email,
//     nama: pegawai.nama,
//     nomor_telepon: pegawai.nomor_telepon,
//     komisi: pegawai.komisi,
//     tgl_lahir: pegawai.tgl_lahir,
//     jabatan: pegawai.jabatan,
//     detail_penitipan: pegawai.penitipan_hunter.map((hunter) => ({
//       barang: hunter.detail_penitipan.map((detail) => ({
//         nama_barang: detail.barang.nama_barang,
//         harga_barang: detail.barang.harga,
//       })),
//     })),
//   };

//   return formattedPegawai;
// };
const profile = async (id) => {
  const id_user = validate(getIdAuthValidation, id);

  const pegawai = await prismaClient.pegawai.findUnique({
    where: {
      id_user: id_user,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      jabatan: true,
      penitipan_hunter: {
        include: {
          detail_penitipan: {
            where: {
              barang: {
                status: "TERJUAL",
              },
            },
            include: {
              barang: true,
            },
          },
        },
      },
    },
  });

  if (!pegawai) {
    throw new ResponseError(404, "Pegawai tidak ditemukan");
  }

  const formattedPegawai = {
    id_pegawai: idToString(pegawai.prefix, pegawai.id_pegawai),
    email: pegawai.user.email,
    nama: pegawai.nama,
    nomor_telepon: pegawai.nomor_telepon,
    komisi: pegawai.komisi,
    tgl_lahir: pegawai.tgl_lahir,
    jabatan: pegawai.jabatan,
    detail_penitipan: pegawai.penitipan_hunter.map((hunter) => ({
      barang: hunter.detail_penitipan.map((detail) => ({
        nama_barang: detail.barang.nama_barang,
        harga_barang: detail.barang.harga,
        komisi: detail.barang.harga * 0.05,
        tanggal_masuk: detail.tanggal_masuk,
        tanggal_laku: detail.barang.updatedAt,
      })),
    })),
  };

  return formattedPegawai;
};

const get = async (id) => {
  id = validate(getIdPegawaiValidation, id);
  const id_pegawai = idToInteger(id);

  const pegawai = await prismaClient.pegawai.findUnique({
    where: {
      id_pegawai: id_pegawai,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      jabatan: true,
    },
  });

  if (!pegawai) {
    throw new ResponseError(404, "Pegawai tidak ditemukan");
  }

  const formattedPegawai = {
    id_pegawai: idToString(pegawai.prefix, pegawai.id_pegawai),
    email: pegawai.user.email,
    nama: pegawai.nama,
    nomor_telepon: pegawai.nomor_telepon,
    komisi: pegawai.komisi,
    tgl_lahir: pegawai.tgl_lahir,
    jabatan: pegawai.jabatan,
  };

  return formattedPegawai;
};

// const getList = async (request) => {
//   const page = parseInt(request.page) || 1;
//   const limit = parseInt(request.limit) || 10;
//   const skip = (page - 1) * limit;
//   const q = request.search;

//   const countAllPegawai = await prismaClient.pegawai.count({
//     where: q
//       ? {
//           OR: [
//             {
//               nama: {
//                 contains: q,
//               },
//             },
//             {
//               user: {
//                 email: {
//                   contains: q,
//                 },
//               },
//             },
//             {
//               jabatan: {
//                 nama_jabatan: {
//                   contains: q,
//                 },
//               },
//             },
//           ],
//         }
//       : {},
//   });

//   const listPegawai = await prismaClient.pegawai.findMany({
//     where: q
//       ? {
//           OR: [
//             {
//               nama: {
//                 contains: q,
//               },
//             },
//             {
//               user: {
//                 email: {
//                   contains: q,
//                 },
//               },
//             },
//             {
//               jabatan: {
//                 nama_jabatan: {
//                   contains: q,
//                 },
//               },
//             },
//           ],
//         }
//       : {},
//     include: {
//       user: {
//         select: {
//           email: true,
//         },
//       },
//       jabatan: true,
//     },
//     skip: skip,
//     take: limit,
//   });

//   const formattedPegawai = listPegawai.map((p) => ({
//     id_pegawai: idToString(p.prefix, p.id_pegawai),
//     email: p.user.email,
//     nama: p.nama,
//     nomor_telepon: p.nomor_telepon,
//     komisi: p.komisi,
//     tgl_lahir: p.tgl_lahir,
//     jabatan: p.jabatan,
//   }));

//   return [formattedPegawai, countAllPegawai];
// };
const getList = async (request) => {
  const page = parseInt(request.page) || 1;
  const limit = parseInt(request.limit) || 10;
  const skip = (page - 1) * limit;
  const q = request.search;
  const id_jabatan = request.id_jabatan
    ? parseInt(request.id_jabatan)
    : undefined;

  const baseWhere = {
    ...(id_jabatan ? { id_jabatan: id_jabatan } : {}),
    ...(q
      ? {
          OR: [
            { nama: { contains: q } },
            { user: { email: { contains: q } } },
            { jabatan: { nama_jabatan: { contains: q } } },
          ],
        }
      : {}),
  };

  const countAllPegawai = await prismaClient.pegawai.count({
    where: baseWhere,
  });

  const listPegawai = await prismaClient.pegawai.findMany({
    where: baseWhere,
    include: {
      user: {
        select: { email: true },
      },
      jabatan: true,
    },
    skip: skip,
    take: limit,
  });

  const formattedPegawai = listPegawai.map((p) => ({
    id_pegawai: idToString(p.prefix, p.id_pegawai),
    email: p.user.email,
    nama: p.nama,
    nomor_telepon: p.nomor_telepon,
    komisi: p.komisi,
    tgl_lahir: p.tgl_lahir,
    jabatan: p.jabatan,
  }));

  return [formattedPegawai, countAllPegawai];
};

const update = async (request) => {
  const updateRequest = validate(updatePegawaiValidation, request);
  const id = idToInteger(updateRequest.id_pegawai);

  const data = await prismaClient.pegawai.findUnique({
    where: {
      id_pegawai: id,
    },
  });

  if (!data) {
    throw new ResponseError(404, "Pegawai tidak ditemukan!");
  }

  if (updateRequest.nama) {
    data.nama = updateRequest.nama;
  }

  if (updateRequest.nomor_telepon) {
    data.nomor_telepon = updateRequest.nomor_telepon;
  }

  if (updateRequest.komisi) {
    data.komisi = updateRequest.komisi;
  }

  if (updateRequest.tgl_lahir) {
    data.tgl_lahir = updateRequest.tgl_lahir;
  }

  if (updateRequest.id_jabatan) {
    data.id_jabatan = updateRequest.id_jabatan;
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

  const updatedPegawai = await prismaClient.pegawai.update({
    where: {
      id_pegawai: id,
    },
    data: data,
    include: {
      user: {
        select: {
          email: true,
        },
      },
      jabatan: true,
    },
  });

  const formattedPegawai = {
    id_pegawai: idToString(updatedPegawai.prefix, updatedPegawai.id_pegawai),
    email: updatedPegawai.user.email,
    nama: updatedPegawai.nama,
    nomor_telepon: updatedPegawai.nomor_telepon,
    komisi: updatedPegawai.komisi,
    tgl_lahir: updatedPegawai.tgl_lahir,
    jabatan: updatedPegawai.jabatan,
  };

  return formattedPegawai;
};

const destroy = async (id) => {
  id = validate(getIdPegawaiValidation, id);
  const id_pegawai = idToInteger(id);

  const user = await prismaClient.user.findFirst({
    where: {
      pegawai: {
        id_pegawai: id_pegawai,
      },
    },
    include: {
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
      id_user: user.id_user,
    },
  });

  return prismaClient.$transaction([deletedPegawai, deletedUser]);
};

export default {
  create,
  profile,
  get,
  getList,
  update,
  destroy,
};
