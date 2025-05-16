import { prismaClient } from "../application/database.js";
import { getUrlFile } from "../application/storage.js";
import { ResponseError } from "../errors/response.error.js";
import { idToInteger, idToString } from "../utils/formater.util.js";
import {
  createKeranjangValidation,
  getKeranjangValidation,
  updateStatusKeranjangValidation,
} from "../validation/keranjang.validate.js";
import { validate } from "../validation/validate.js";

const create = async (request) => {
  request = validate(createKeranjangValidation, request);
  request.id_barang = idToInteger(request.id_barang);

  const countKeranjang = await prismaClient.keranjang.findMany({
    where: {
      id_pembeli: request.id_pembeli,
    },
  });

  console.log("ini id barang: ", request.id_barang);

  const checkBarangInKeranjang = await prismaClient.keranjang.count({
    where: {
      AND: [
        {
          id_pembeli: request.id_pembeli,
        },
        {
          id_barang: request.id_barang,
        },
      ],
    },
  });

  if (checkBarangInKeranjang >= 1) {
    throw new ResponseError(
      400,
      "Hanya bisa menambahkan 1 barang yang sama dikeranjang!"
    );
  }

  if (countKeranjang > 100) {
    throw new ResponseError(
      400,
      "Hanya boleh maksimal menambahkan 100 barang per pengguna!"
    );
  }

  return prismaClient.keranjang.create({
    data: request,
  });
};

const getList = async (query, id_pembeli) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  if (!id_pembeli) {
    throw new ResponseError(401, "Tidak diijinkan!");
  }

  const countKeranjang = await prismaClient.keranjang.count({
    where: {
      id_pembeli: id_pembeli,
    },
    skip: skip,
    take: limit,
  });

  const listKeranjang = await prismaClient.keranjang.findMany({
    where: {
      id_pembeli: id_pembeli,
    },
    include: {
      barang: {
        include: {
          gambar: true,
          detail_penitipan: {
            include: {
              penitipan: {
                include: {
                  penitip: {
                    select: {
                      nama: true,
                      id_penitip: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    skip: skip,
    take: limit,
  });

  const formattedKeranjang = await Promise.all(
    listKeranjang.map(async (keranjang) => {
      const format = {
        id_keranjang: keranjang.id_keranjang,
        id_barang: idToString(keranjang.barang.prefix, keranjang.id_barang),
        id_pembeli: keranjang.id_pembeli,
        is_selected: keranjang.is_selected,
        id_penitip:
          keranjang.barang.detail_penitipan.penitipan.penitip.id_penitip,
        nama_penitip: keranjang.barang.detail_penitipan.penitipan.penitip.nama,
        nama_barang: keranjang.barang.nama_barang,
        harga_barang: keranjang.barang.harga,
        gambar_barang:
          keranjang.barang.gambar.length > 1
            ? keranjang.barang.gambar
                .filter((g) => g.is_primary === true && g.url_gambar)
                .pop().url_gambar
            : "",
        createdAt: keranjang.createdAt,
      };

      if (format.gambar_barang) {
        format.gambar_barang = await getUrlFile(format.gambar_barang);
      }

      return format;
    })
  );

  return [formattedKeranjang, countKeranjang];
};

const updateStatus = async (id, id_pembeli, newStatus) => {
  const id_keranjang = validate(getKeranjangValidation, id);
  newStatus = validate(updateStatusKeranjangValidation, newStatus);

  const keranjang = await prismaClient.keranjang.findUnique({
    where: {
      id_keranjang: id_keranjang,
    },
  });

  if (!keranjang) {
    throw new ResponseError(404, "Keranjang tidak ditemukan!");
  }

  if (keranjang.id_pembeli !== id_pembeli) {
    throw new ResponseError(
      404,
      "Hanya bisa mengupdate status keranjang sendiri!"
    );
  }

  keranjang.is_selected = newStatus;

  const result = await prismaClient.keranjang.update({
    where: {
      id_keranjang: id_keranjang,
    },
    data: keranjang,
  });

  return result;
};

const destroy = async (id, id_pembeli) => {
  const id_keranjang = validate(getKeranjangValidation, id);

  const keranjang = await prismaClient.keranjang.findUnique({
    where: {
      id_keranjang: id_keranjang,
    },
  });

  if (!keranjang) {
    throw new ResponseError(404, "Keranjang tidak ditemukan!");
  }

  if (keranjang.id_pembeli !== id_pembeli) {
    throw new ResponseError(404, "Hanya bisa menghapus keranjang sendiri!");
  }

  return prismaClient.keranjang.delete({
    where: {
      id_keranjang: id_keranjang,
    },
  });
};

export default {
  create,
  getList,
  destroy,
  updateStatus,
};
