import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { idToInteger, idToString } from "../utils/id_formater.util.js";
import { getIdAuthValidation } from "../validation/auth.validate.js";
import {
  createPenitipValidation,
  getPenitipValidation,
  updatePenitipValidation,
  updateSistemPenitipValidation,
} from "../validation/penitip.validate.js";
import { validate } from "../validation/validate.js";
import authService from "./auth.service.js";

const login = async (request) => {
  const loginUser = await authService.login(request);

  if (loginUser.user.role !== "PENITIP") {
    await authService.logout(loginUser.token);
    throw new ResponseError(401, "Login gagal, Anda bukan penitip!");
  }

  return {
    token: loginUser.token,
  };
};

const create = async (request) => {

  

  // const penitip = validate(createPenitipValidation, request);

  // const createdPenitip = await prismaClient.penitip.create({
  //   data: penitip,
  //   include: {
  //     user: {
  //       select: {
  //         email: true,
  //       },
  //     },
  //   },
  // });

  // const formattedPenitip = {
  //   id_penitip: idToString(createdPenitip.prefix, createdPenitip.id_penitip),
  //   email: createdPenitip.user.email,
  //   nomor_ktp: createdPenitip.nomor_ktp,
  //   nama: createdPenitip.nama,
  //   alamat: createdPenitip.alamat,
  //   nomor_telepon: createdPenitip.nomor_telepon,
  //   saldo: createdPenitip.saldo,
  //   rating: createdPenitip.rating,
  //   total_review: createdPenitip.total_review,
  //   jumlah_review: createdPenitip.jumlah_review,
  //   is_top_seller: createdPenitip.is_top_seller,
  //   poin: createdPenitip.poin,
  // };

  // return formattedPenitip;
};

const profile = async (id) => {
  const id_user = validate(getIdAuthValidation, id);

  const penitip = await prismaClient.penitip.findUnique({
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
    },
  });

  if (!penitip) {
    throw new ResponseError(404, "Penitip tidak ditemukan");
  }

  const formattedPenitip = {
    id_penitip: idToString(penitip.prefix, penitip.id_penitip),
    email: penitip.user.email,
    nama: penitip.nama,
    nomor_telepon: penitip.nomor_telepon,
    komisi: penitip.komisi,
    tgl_lahir: penitip.tgl_lahir,
    jabatan: penitip.jabatan,
  };

  return formattedPenitip;
};

const get = async (id) => {
  id = validate(getIdPenitipValidation, id);
  const id_penitip = idToInteger(id);

  const penitip = await prismaClient.penitip.findUnique({
    where: {
      id_penitip: id_penitip,
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

  if (!penitip) {
    throw new ResponseError(404, "Penitip tidak ditemukan");
  }

  const formattedPenitip = {
    id_penitip: idToString(penitip.prefix, penitip.id_penitip),
    email: penitip.user.email,
    nama: penitip.nama,
    nomor_telepon: penitip.nomor_telepon,
    komisi: penitip.komisi,
    tgl_lahir: penitip.tgl_lahir,
    jabatan: penitip.jabatan,
  };

  return formattedPenitip;
};

const getList = async (request) => {
  let listPenitip;
  const page = parseInt(request.page) || 1;
  const limit = parseInt(request.limit) || 10;
  const skip = (page - 1) * limit;
  const q = request.search || null;
  if (q !== null) {
    listPenitip = await prismaClient.penitip.findMany({
      where: {
        OR: [
          {
            nama: {
              contains: q,
            },
          },
          {
            user: {
              email: {
                contains: q,
              },
            },
            jabatan: {
              nama_jabatan: {
                contains: q,
              },
            },
          },
        ],
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        jabatan: true,
      },
      skip: skip,
      take: limit,
    });
  } else {
    listPenitip = await prismaClient.penitip.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
        jabatan: true,
      },
      skip: skip,
      take: limit,
    });
  }

  const formattedPenitip = listPenitip.map((p) => ({
    id_penitip: idToString(p.prefix, p.id_penitip),
    email: p.user.email,
    nama: p.nama,
    nomor_telepon: p.nomor_telepon,
    komisi: p.komisi,
    tgl_lahir: p.tgl_lahir,
    jabatan: p.jabatan,
  }));

  return formattedPenitip;
};

const update = async (request) => {
  const updateRequest = validate(updatePenitipValidation, request);
  const id = idToInteger(updateRequest.id_penitip);

  const data = await prismaClient.penitip.findUnique({
    where: {
      id_penitip: id,
    },
  });

  if (!data) {
    throw new ResponseError(404, "Penitip tidak ditemukan!");
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

  const updatedPenitip = await prismaClient.penitip.update({
    where: {
      id_penitip: id,
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

  const formattedPenitip = {
    id_penitip: idToString(updatedPenitip.prefix, updatedPenitip.id_penitip),
    email: updatedPenitip.user.email,
    nama: updatedPenitip.nama,
    nomor_telepon: updatedPenitip.nomor_telepon,
    komisi: updatedPenitip.komisi,
    tgl_lahir: updatedPenitip.tgl_lahir,
    jabatan: updatedPenitip.jabatan,
  };

  return formattedPenitip;
};

const destroy = async (id) => {
  id = validate(getIdPenitipValidation, id);
  const id_penitip = idToInteger(id);

  const user = await prismaClient.user.findFirst({
    where: {
      penitip: {
        id_penitip: id_penitip,
      },
    },
    include: {
      penitip: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "Penitip tidak ditemukan!");
  }

  const deletedPenitip = prismaClient.penitip.delete({
    where: {
      id_penitip: user.penitip.id_penitip,
    },
  });

  const deletedUser = prismaClient.user.delete({
    where: {
      id_user: user.id_user,
    },
  });

  return prismaClient.$transaction([deletedPenitip, deletedUser]);
};

export default {
  login,
  create,
  profile,
  get,
  getList,
  update,
  destroy,
};
