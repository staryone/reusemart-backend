import { prismaClient } from "../application/database.js";
import { getUrlFile, uploadFile, deleteFile } from "../application/storage.js";
import { ResponseError } from "../errors/response.error.js";
import { idToString } from "../utils/formater.util.js";

const get = async (idMerchandise) => {
  const id_merchandise = parseInt(idMerchandise);

  const merchandise = await prismaClient.merchandise.findUnique({
    where: {
      id_merchandise,
    },
    select: {
      id_merchandise: true,
      nama_merch: true,
      harga_poin: true,
      stok: true,
      url_gambar: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!merchandise) {
    throw new ResponseError(404, "Merchandise tidak ditemukan");
  }

  return {
    id_merchandise: merchandise.id_merchandise,
    nama_merch: merchandise.nama_merch,
    harga_poin: merchandise.harga_poin,
    stok: merchandise.stok,
    url_gambar: merchandise.url_gambar,
    createdAt: merchandise.createdAt,
    updatedAt: merchandise.updatedAt,
  };
};

const getList = async (query) => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = query.all ? undefined : (page - 1) * limit;
  const q = query.search || "";
  const minHarga = query.minHarga ? parseInt(query.minHarga) : undefined;
  const maxHarga = query.maxHarga ? parseInt(query.maxHarga) : undefined;
  const minStok = query.minStok ? parseInt(query.minStok) : undefined;

  const whereClause = {
    AND: [
      q
        ? {
            nama_merch: {
              contains: q,
              mode: "insensitive",
            },
          }
        : {},
      minHarga ? { harga_poin: { gte: minHarga } } : {},
      maxHarga ? { harga_poin: { lte: maxHarga } } : {},
      minStok ? { stok: { gte: minStok } } : {},
    ],
  };

  const countAllMerchandise = await prismaClient.merchandise.count({
    where: whereClause,
  });

  const findManyOptions = {
    where: whereClause,
    select: {
      id_merchandise: true,
      nama_merch: true,
      harga_poin: true,
      stok: true,
      url_gambar: true,
      createdAt: true,
      updatedAt: true,
    },
  };

  if (!query.all && skip !== undefined && limit !== undefined) {
    findManyOptions.skip = skip;
    findManyOptions.take = limit;
  }

  const listMerchandise = await prismaClient.merchandise.findMany(
    findManyOptions
  );

  const formattedMerchandise = await Promise.all(
    listMerchandise.map(async (merch) => ({
      id_merchandise: merch.id_merchandise,
      nama_merch: merch.nama_merch,
      harga_poin: merch.harga_poin,
      stok: merch.stok,
      url_gambar: merch.url_gambar,
      createdAt: merch.createdAt,
      updatedAt: merch.updatedAt,
    }))
  );

  return [formattedMerchandise, countAllMerchandise];
};

const update = async (id_merchandise, request) => {
  const existingMerch = await prismaClient.merchandise.findUnique({
    where: { id_merchandise },
    select: { url_gambar: true },
  });

  if (!existingMerch) {
    throw new ResponseError(404, "Merchandise tidak ditemukan");
  }

  let imageURL = existingMerch.url_gambar;
  if (request.gambar) {
    // Delete old image if exists
    if (existingMerch.url_gambar) {
      try {
        await deleteFile(existingMerch.url_gambar);
      } catch (error) {
        console.error(
          `Failed to delete old merchandise image: ${error.message}`
        );
      }
    }

    // Upload new image
    request.gambar.fieldname = formatNamaGambarMerch(id_merchandise);
    await uploadFile(request.gambar, "gambar_merchandise");
    imageURL =
      "gambar_merchandise/" +
      request.gambar.fieldname +
      "." +
      String(request.gambar.mimetype).slice(6);
  }

  delete request.gambar;

  const updatedMerch = await prismaClient.merchandise.update({
    where: { id_merchandise },
    data: {
      nama_merch: request.nama_merch,
      harga_poin: request.harga_poin,
      stok: request.stok,
      url_gambar: imageURL,
    },
    select: { id_merchandise: true },
  });

  return idToString("MERCH", updatedMerch.id_merchandise);
};

export default {
  get,
  getList,
  update,
};
