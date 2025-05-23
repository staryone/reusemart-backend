import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { createPenitipanValidation } from "../validation/penitipan.validate.js";
import { validate } from "../validation/validate.js";
import { getUrlFile } from "../application/storage.js";
import barangService from "./barang.service.js";

const create = async (
  barangDataArray,
  penitipanData,
  detailPenitipanDataArray
) => {
  // Validate penitipanData using Joi schema
  // console.log("\n\n", detailPenitipanDataArray);
  const validatedPenitipanData = validate(
    createPenitipanValidation,
    penitipanData
  );

  // Validate input data
  if (!Array.isArray(barangDataArray) || barangDataArray.length === 0) {
    throw new ResponseError(400, "At least one barangData is required");
  }
  if (
    !Array.isArray(detailPenitipanDataArray) ||
    detailPenitipanDataArray.length === 0 ||
    detailPenitipanDataArray.length !== barangDataArray.length
  ) {
    throw new ResponseError(
      400,
      "detailPenitipanDataArray must match barangDataArray in length"
    );
  }
  if (
    detailPenitipanDataArray.some((d) => !d.tanggal_akhir || !d.batas_ambil)
  ) {
    throw new ResponseError(
      400,
      "Each detailPenitipan must have tanggal_akhir and batas_ambil"
    );
  }

  // Use a transaction to ensure atomicity
  const result = await prismaClient.$transaction(async (tx) => {
    // Step 1: Create multiple Barang records
    const idBarangArray = await Promise.all(
      barangDataArray.map((barangData) =>
        barangService.create(barangData, validatedPenitipanData.id_penitip)
      )
    );

    // Step 2: Create Penitipan record
    const penitipan = await tx.penitipan.create({
      data: {
        id_penitip: validatedPenitipanData.id_penitip,
        id_pegawai_qc: validatedPenitipanData.id_pegawai_qc,
        id_hunter: validatedPenitipanData.id_hunter || null, // Optional field
      },
    });

    // Step 3: Create DetailPenitipan records
    const detailPenitipanRecords = detailPenitipanDataArray.map(
      (detail, index) => ({
        id_penitipan: penitipan.id_penitipan,
        id_barang: idBarangArray[index],
        tanggal_masuk: new Date(), // Defaults to now
        tanggal_akhir: new Date(detail.tanggal_akhir),
        batas_ambil: new Date(detail.batas_ambil),
        tanggal_laku: detail.tanggal_laku
          ? new Date(detail.tanggal_laku)
          : null,
        is_perpanjang: detail.is_perpanjang || false,
      })
    );

    const detailPenitipan = await tx.detailPenitipan.createMany({
      data: detailPenitipanRecords,
    });

    return {
      penitipan,
      detailPenitipan: detailPenitipanRecords, // Return formatted input data
      barang: idBarangArray.map((id_barang) => ({ id_barang })),
      message: "Barang, Penitipan, and DetailPenitipan created successfully",
    };
  });

  return result;
};

const getList = async (request) => {
  const page = parseInt(request.page) || 1;
  const limit = parseInt(request.limit) || 10;
  const skip = (page - 1) * limit;
  const q = request.search;

  const countAllPenitipan = await prismaClient.detailPenitipan.count({
    where: q
      ? {
          OR: [
            {
              penitipan: {
                penitip: {
                  nama: {
                    contains: q,
                  },
                },
              },
            },
            {
              barang: {
                nama_barang: {
                  contains: q,
                },
              },
            },
          ],
        }
      : {},
  });

  const listPenitipan = await prismaClient.detailPenitipan.findMany({
    where: q
      ? {
          OR: [
            {
              penitipan: {
                penitip: {
                  nama: {
                    contains: q,
                  },
                },
              },
            },
            {
              barang: {
                nama_barang: {
                  contains: q,
                },
              },
            },
          ],
        }
      : {},
    include: {
      barang: {
        select: {
          nama_barang: true,
          harga: true,
          status: true,
          deskripsi: true,
          berat: true,
          garansi: true,
          kategori: true,
          gambar: true,
        },
      },
      penitipan: {
        select: {
          id_penitipan: true,
          penitip: true,
          pegawai_qc: true,
          hunter: true,
        },
      },
    },
    orderBy: {
      tanggal_masuk: "desc",
    },
    skip: skip,
    take: limit,
  });

  const formattedPenitipan = await Promise.all(
    listPenitipan.map(async (p) => {
      const gambarPromises = p.barang.gambar.map(async (g) => {
        try {
          const url = await getUrlFile(g.url_gambar);
          return {
            id_gambar: g.id_gambar,
            url_gambar: url,
            order_number: g.order_number,
            is_primary: g.is_primary,
            id_barang: g.id_barang,
            createdAt: g.createdAt,
            updatedAt: g.updatedAt,
          };
        } catch {
          return {
            id_gambar: g.id_gambar,
            url_gambar: null,
            order_number: g.order_number,
            is_primary: g.is_primary,
            id_barang: g.id_barang,
            createdAt: g.createdAt,
            updatedAt: g.updatedAt,
          };
        }
      });
      const gambarResults = await Promise.allSettled(gambarPromises);
      const gambar = gambarResults.map((result) => {
        if (result.status === "fulfilled") {
          return result.value;
        }
        return result.reason;
      });
      return {
        id_dtl_penitipan: p.id_dtl_penitipan,
        tanggal_masuk: p.tanggal_masuk,
        tanggal_akhir: p.tanggal_akhir,
        tanggal_laku: p.tanggal_laku,
        batas_ambil: p.batas_ambil,
        is_perpanjang: p.is_perpanjang,
        penitipan: p.penitipan,
        barang: {
          nama_barang: p.barang.nama_barang,
          deskripsi: p.barang.deskripsi,
          harga: p.barang.harga,
          status: p.barang.status,
          garansi: p.barang.garansi ? p.barang.garansi : null,
          berat: p.barang.berat,
          kategori: p.barang.kategori,
          gambar: gambar,
        },
      };
    })
  );

  return [formattedPenitipan, countAllPenitipan];
};

const update = async (
  id_dtl_penitipan,
  barangDataArray,
  penitipanData,
  detailPenitipanDataArray,
  existingGambarArrays
) => {
  // Validate penitipanData using Joi schema
  const validatedPenitipanData = validate(
    createPenitipanValidation,
    penitipanData
  );

  // Validate input data
  if (!id_dtl_penitipan) {
    throw new ResponseError(400, "id_dtl_penitipan is required");
  }
  if (!Array.isArray(barangDataArray) || barangDataArray.length === 0) {
    throw new ResponseError(400, "At least one barangData is required");
  }
  if (
    !Array.isArray(detailPenitipanDataArray) ||
    detailPenitipanDataArray.length === 0 ||
    detailPenitipanDataArray.length !== barangDataArray.length
  ) {
    throw new ResponseError(
      400,
      "detailPenitipanDataArray must match barangDataArray in length"
    );
  }
  if (
    detailPenitipanDataArray.some((d) => !d.tanggal_akhir || !d.batas_ambil)
  ) {
    throw new ResponseError(
      400,
      "Each detailPenitipan must have tanggal_akhir and batas_ambil"
    );
  }

  // Verify that the DetailPenitipan record exists
  const existingDetailPenitipan = await prismaClient.detailPenitipan.findUnique({
    where: { id_dtl_penitipan: parseInt(id_dtl_penitipan) },
    include: {
      barang: true,
      penitipan: true,
    },
  });

  if (!existingDetailPenitipan) {
    throw new ResponseError(404, "DetailPenitipan not found");
  }

  // Use a transaction to ensure atomicity
  const result = await prismaClient.$transaction(async (tx) => {
    // Step 1: Update Barang record
    const barangData = barangDataArray[0]; // Assuming single barang per DetailPenitipan
    const existingGambar = existingGambarArrays ? existingGambarArrays[0] : []; // Array of { id_gambar }
    const id_barang = existingDetailPenitipan.barang.prefix + existingDetailPenitipan.barang.id_barang;
    const updatedBarangId = await barangService.update(
      id_barang,
      barangData,
      validatedPenitipanData.id_penitip,
      existingGambar
    );

    // Step 2: Update Penitipan record
    const penitipan = await tx.penitipan.update({
      where: { id_penitipan: existingDetailPenitipan.penitipan.id_penitipan },
      data: {
        id_penitip: validatedPenitipanData.id_penitip,
        id_pegawai_qc: validatedPenitipanData.id_pegawai_qc,
        id_hunter: validatedPenitipanData.id_hunter || null,
      },
    });

    // Step 3: Update DetailPenitipan record
    const detailPenitipanData = detailPenitipanDataArray[0]; // Assuming single detail per DetailPenitipan
    const detailPenitipan = await tx.detailPenitipan.update({
      where: { id_dtl_penitipan: parseInt(id_dtl_penitipan) },
      data: {
        id_penitipan: penitipan.id_penitipan,
        id_barang: updatedBarangId,
        tanggal_masuk: new Date(detailPenitipanData.tanggal_masuk),
        tanggal_akhir: new Date(detailPenitipanData.tanggal_akhir),
        batas_ambil: new Date(detailPenitipanData.batas_ambil),
        tanggal_laku: detailPenitipanData.tanggal_laku
          ? new Date(detailPenitipanData.tanggal_laku)
          : null,
        is_perpanjang: detailPenitipanData.is_perpanjang || false,
      },
    });

    // Step 4: Format the response
    const formattedDetailPenitipan = {
      id_dtl_penitipan: detailPenitipan.id_dtl_penitipan,
      id_penitipan: detailPenitipan.id_penitipan,
      id_barang: detailPenitipan.id_barang,
      tanggal_masuk: detailPenitipan.tanggal_masuk,
      tanggal_akhir: detailPenitipan.tanggal_akhir,
      batas_ambil: detailPenitipan.batas_ambil,
      tanggal_laku: detailPenitipan.tanggal_laku,
      is_perpanjang: detailPenitipan.is_perpanjang,
    };

    return {
      penitipan,
      detailPenitipan: [formattedDetailPenitipan],
      barang: [{ id_barang: updatedBarangId }],
      message: "Barang, Penitipan, and DetailPenitipan updated successfully",
    };
  });

  return result;
};

export default {
  create,
  getList,
  update,
};
