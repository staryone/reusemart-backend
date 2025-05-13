import { prismaClient } from "../application/database.js";
import { deleteFile, getUrlFile, uploadFile } from "../application/storage.js";
import { ResponseError } from "../errors/response.error.js";
import { idToInteger, idToString } from "../utils/formater.util.js";
import { getIdAuthValidation } from "../validation/auth.validate.js";
import {
  createPembeliValidation,
  getPembeliValidation,
  updatePoinPembeliValidation,
} from "../validation/pembeli.validate.js";
import { validate } from "../validation/validate.js";
import authService from "./auth.service.js";

const login = async (request) => {
  const loginUser = await authService.login(request);

  if (loginUser.user.role !== "PEMBELI") {
    await authService.logout(loginUser.token);
    throw new ResponseError(401, "Login gagal, Anda bukan pembeli!");
  }

  return {
    token: loginUser.token,
  };
};

const create = async (request) => {
  const pembeli = validate(createPembeliValidation, request);

  const createdPembeli = await prismaClient.pembeli.create({
    data: pembeli,
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  const formattedPembeli = {
    id_pembeli: createdPembeli.id_pembeli,
    email: createdPembeli.user.email,
    nama: createdPembeli.nama,
    nomor_telepon: createdPembeli.nomor_telepon,
    poin_loyalitas: createdPembeli.poin_loyalitas,
  };

  return formattedPembeli;
};

const profile = async (id) => {
  const id_user = validate(getIdAuthValidation, id);

  const pembeli = await prismaClient.pembeli.findUnique({
    where: {
      id_user: id_user,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      transaksi: {
        include: {
          pengiriman: true,
          detail_transaksi: {
            select: {
              barang: {
                include: {
                  gambar: true,
                },
              },
            },
          },
        },
      },
      alamat: true,
    },
  });

  if (!pembeli) {
    throw new ResponseError(404, "Pembeli tidak ditemukan");
  }

  const formattedPembeli = {
    id_pembeli: pembeli.id_pembeli,
    email: pembeli.user.email,
    nama: pembeli.nama,
    nomor_telepon: pembeli.nomor_telepon,
    poin_loyalitas: pembeli.poin_loyalitas,
    alamat: pembeli.alamat,
    transaksi: pembeli.transaksi,
  };

  return formattedPembeli;
};

export default {
  login,
  create,
  profile,
};
