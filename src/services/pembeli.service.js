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
              is_rating: true,
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

const tambahPoin = async (id, poin) => {
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
    },
  });

  if (!pembeli) {
    throw new ResponseError(404, "Pembeli tidak ditemukan");
  }

  const updatedPembeli = await prismaClient.pembeli.update({
    where: {
      id_user: id_user,
    },
    data: {
      poin_loyalitas: pembeli.poin_loyalitas + Number(poin),
    },
  });

  return {
    message: "OK",
    tambahan: poin,
    poin_loyalitas: updatedPembeli.poin_loyalitas,
  };
};

export default {
  create,
  profile,
  tambahPoin,
};
