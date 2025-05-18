import { prismaClient } from "../application/database.js";
import { getUrlFile, uploadFile } from "../application/storage.js";
import { ResponseError } from "../errors/response.error.js";
import { createPenitipanValidation } from "../validation/penitipan.validate.js";
import { validate } from "../validation/validate.js";
import barangService from "../services/barang.service.js";

const create = async (request, id_barang_list) => {
  // Validate the incoming penitipan request
  const penitipan = validate(createPenitipanValidation, request);

  // Ensure id_barang_list is an array and not empty
  if (!Array.isArray(id_barang_list) || id_barang_list.length === 0) {
    throw new ResponseError(400, "id_barang_list must be a non-empty array");
  }

  // Validate that all id_barang exist in the Barang table
  const barangList = await prismaClient.barang.findMany({
    where: {
      id_barang: { in: id_barang_list },
    },
  });

  if (barangList.length !== id_barang_list.length) {
    throw new ResponseError(404, "One or more Barang IDs not found");
  }

  // Check if any id_barang is already associated with another DetailPenitipan
  const existingDetails = await prismaClient.detailPenitipan.findMany({
    where: {
      id_barang: { in: id_barang_list },
    },
  });

  if (existingDetails.length > 0) {
    const usedBarangIds = existingDetails.map(detail => detail.id_barang);
    throw new ResponseError(400, `Barang IDs already associated: ${usedBarangIds.join(", ")}`);
  }

  // Create Penitipan and DetailPenitipan records in a transaction
  const [createdPenitipan, createdDetailPenitipans] = await prismaClient.$transaction([
    prismaClient.penitipan.create({
      data: penitipan,
    }),
    prismaClient.detailPenitipan.createMany({
      data: id_barang_list.map(id_barang => ({
        id_penitipan: createdPenitipan.id_penitipan,
        id_barang,
      })),
    }),
  ]);

  // Fetch the created DetailPenitipan records for response formatting
  const detailPenitipans = await prismaClient.detailPenitipan.findMany({
    where: {
      id_penitipan: createdPenitipan.id_penitipan,
    },
  });

  // Format the response
  const formattedPenitipan = {
    id_penitipan: createdPenitipan.id_penitipan,
    tanggal_masuk: createdPenitipan.tanggal_masuk,
    tanggal_akhir: createdPenitipan.tanggal_akhir,
    tanggal_laku: createdPenitipan.tanggal_laku,
    batas_ambil: createdPenitipan.batas_ambil,
    is_perpanjang: createdPenitipan.is_perpanjang,
    id_penitip: createdPenitipan.id_penitip,
    id_hunter: createdPenitipan.id_hunter,
    id_pegawai_qc: createdPenitipan.id_pegawai_qc,
    detail_penitipan: detailPenitipans.map(detail => ({
      id_dtl_penitipan: detail.id_dtl_penitipan,
      id_barang: detail.id_barang,
    })),
  };

  return formattedPenitipan;
};

const createBarangAndPenitipan = async (barangRequests, penitipanRequest, id_penitip) => {
  if (!Array.isArray(barangRequests) || barangRequests.length === 0 || !penitipanRequest || !id_penitip) {
    throw new ResponseError(400, "Missing or invalid inputs");
  }

  const result = await prismaClient.$transaction(async (prisma) => {
    // Create multiple Barang records
    const barangList = await Promise.all(
      barangRequests.map((barangRequest) => barangService.create(barangRequest, id_penitip))
    );

    // Extract id_barang values
    const id_barang_list = barangList.map((barang) => barang.id_barang);

    // Create Penitipan with all id_barang
    const penitipan = await create(penitipanRequest, id_barang_list);

    return {
      barang: barangList.map((barang) => ({ id_barang: barang.id_barang })),
      penitipan,
    };
  });

  return result;
};
