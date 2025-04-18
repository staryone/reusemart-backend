import { prismaClient } from "../application/database.js";
import { idToString } from "../utils/id_formater.util.js";
import { getIdAuthValidation } from "../validation/auth.validate.js";
import {
  createOrganisasiValidation,
  getOrganisasiValidation,
  updateOrganisasiValidation,
} from "../validation/organisasi.validate.js";
import { validate } from "../validation/validate.js";
import authService from "./auth.service.js";

const login = async (request) => {
  const loginUser = await authService.login(request);

  if (loginUser.user.role !== "ORGANISASI") {
    await authService.logout(loginUser.token);
    throw new ResponseError(401, "Login gagal, Anda bukan organisasi!");
  }

  return {
    token: loginUser.token,
  };
};

const create = async (request) => {
  const org = validate(createOrganisasiValidation, request);

  const createdOrg = await prismaClient.organisasi.create({
    data: org,
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  const formattedOrganisasi = {
    id_organisasi: idToString(createdOrg.prefix, createdOrg.id_organisasi),
    email: createdOrg.user.email,
    nama_organisasi: createdOrg.nama_organisasi,
    alamat: createdOrg.alamat,
    nomor_telepon: createdOrg.nomor_telepon,
    deskripsi: createdOrg.deskripsi,
  };

  return formattedOrganisasi;
};

const profile = async (id) => {
  const id_user = validate(getIdAuthValidation, id);

  const organisasi = await prismaClient.organisasi.findUnique({
    where: {
      id_user: id_user,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!organisasi) {
    throw new ResponseError(404, "Organisasi tidak ditemukan");
  }

  const formattedOrganisasi = {
    id_organisasi: idToString(organisasi.prefix, organisasi.id_organisasi),
    email: organisasi.user.email,
    nama_organisasi: organisasi.nama_organisasi,
    alamat: organisasi.alamat,
    nomor_telepon: organisasi.nomor_telepon,
    deskripsi: organisasi.deskripsi,
  };

  return formattedOrganisasi;
};

const get = async (id) => {
  id = validate(getOrganisasiValidation, id);
  const id_organisasi = idToInteger(id);

  const organisasi = await prismaClient.organisasi.findUnique({
    where: {
      id_organisasi: id_organisasi,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!organisasi) {
    throw new ResponseError(404, "Organisasi tidak ditemukan");
  }

  const formattedOrganisasi = {
    id_organisasi: idToString(organisasi.prefix, organisasi.id_organisasi),
    email: organisasi.user.email,
    nama_organisasi: organisasi.nama_organisasi,
    alamat: organisasi.alamat,
    nomor_telepon: organisasi.nomor_telepon,
    deskripsi: organisasi.deskripsi,
  };

  return formattedOrganisasi;
};

const getList = async (request) => {
  let listOrganisasi;
  const page = parseInt(request.page) || 1;
  const limit = parseInt(request.limit) || 10;
  const skip = (page - 1) * limit;
  const q = request.search || null;
  if (q !== null) {
    listOrganisasi = await prismaClient.organisasi.findMany({
      where: {
        OR: [
          {
            nama_organisasi: {
              contains: q,
            },
          },
          {
            user: {
              email: {
                contains: q,
              },
            },
          },
          {
            nomor_telepon: {
              contains: q,
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
      },
      skip: skip,
      take: limit,
    });
  } else {
    listOrganisasi = await prismaClient.organisasi.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      skip: skip,
      take: limit,
    });
  }

  const formattedOrganisasi = listOrganisasi.map((organisasi) => ({
    id_organisasi: idToString(organisasi.prefix, organisasi.id_organisasi),
    email: organisasi.user.email,
    nama_organisasi: organisasi.nama_organisasi,
    alamat: organisasi.alamat,
    nomor_telepon: organisasi.nomor_telepon,
    deskripsi: organisasi.deskripsi,
  }));

  return formattedOrganisasi;
};

const update = async (request) => {
  const updateRequest = validate(updateOrganisasiValidation, request);
  const id = idToInteger(updateRequest.id_organisasi);

  const data = await prismaClient.organisasi.findUnique({
    where: {
      id_organisasi: id,
    },
  });

  if (!data) {
    throw new ResponseError(404, "Organisasi tidak ditemukan!");
  }

  if (updateRequest.nama) {
    data.nama_organisasi = updateRequest.nama_organisasi;
  }

  if (updateRequest.komisi) {
    data.alamat = updateRequest.alamat;
  }

  if (updateRequest.nomor_telepon) {
    data.nomor_telepon = updateRequest.nomor_telepon;
  }

  if (updateRequest.tgl_lahir) {
    data.deskripsi = updateRequest.deskripsi;
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

  const updatedOrganisasi = await prismaClient.organisasi.update({
    where: {
      id_organisasi: id,
    },
    data: data,
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  const formattedOrganisasi = {
    id_organisasi: idToString(
      updatedOrganisasi.prefix,
      updatedOrganisasi.id_organisasi
    ),
    email: updatedOrganisasi.user.email,
    nama: updatedOrganisasi.nama,
    nomor_telepon: updatedOrganisasi.nomor_telepon,
    komisi: updatedOrganisasi.komisi,
    tgl_lahir: updatedOrganisasi.tgl_lahir,
    jabatan: updatedOrganisasi.jabatan,
  };

  return formattedOrganisasi;
};

const destroy = async (id) => {
  id = validate(getOrganisasiValidation, id);
  const id_organisasi = idToInteger(id);

  const org = await prismaClient.organisasi.findUnique({
    where: {
      id_organisasi: id_organisasi,
    },
    include: {
      user: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "Organisasi tidak ditemukan!");
  }

  const deletedOrganisasi = prismaClient.organisasi.delete({
    where: {
      id_organisasi: org.id_organisasi,
    },
  });

  const deletedUser = prismaClient.user.delete({
    where: {
      id_user: org.user.id_user,
    },
  });

  return prismaClient.$transaction([deletedOrganisasi, deletedUser]);
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
