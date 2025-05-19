import { prismaClient } from "../application/database.js";
import { getUrlFile } from "../application/storage.js";
import { ResponseError } from "../errors/response.error.js";
import { idToInteger, idToString } from "../utils/formater.util.js";
import { createTransaksiValidation } from "../validation/transaksi.validate.js";
import { validate } from "../validation/validate.js";

const create = async (request) => {
  request = validate(createTransaksiValidation, request);
  const listHargaPoinBarang = await Promise.all(
    request.id_barang.map(async (id) => {
      const result = await prismaClient.barang.findUnique({
        where: {
          id_barang: id,
        },
        select: {
          harga: true,
        },
      });
      return {
        harga: result.harga,
        poin: result.harga / 10000,
      };
    })
  );

  delete request.id_barang;

  console.log(listHargaPoinBarang);

  await prismaClient.$transaction;

  return prismaClient.transaksi.create({
    data: request,
  });
};

export default {
  create,
};
