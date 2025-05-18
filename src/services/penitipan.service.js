import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { createPenitipanValidation } from "../validation/penitipan.validate.js";
import { validate } from "../validation/validate.js";
import { ResponseError } from "../errors/response.error.js";
import barangService from "../services/barang.service.js";

const create = async (barangDataArray, penitipanData, detailPenitipanDataArray) => {
  try {
      // Validate input data
      if (!Array.isArray(barangDataArray) || barangDataArray.length === 0) {
        throw new Error('At least one barangData is required');
      }
      if (!penitipanData.id_penitip || !penitipanData.id_pegawai_qc) {
        throw new Error('id_penitip and id_pegawai_qc are required');
      }
      if (
        !Array.isArray(detailPenitipanDataArray) ||
        detailPenitipanDataArray.length === 0 ||
        detailPenitipanDataArray.length !== barangDataArray.length
      ) {
        throw new Error('detailPenitipanDataArray must match barangDataArray in length');
      }
      if (detailPenitipanDataArray.some((d) => !d.tanggal_akhir || !d.batas_ambil)) {
        throw new Error('Each detailPenitipan must have tanggal_akhir and batas_ambil');
      }

      // Use a transaction to ensure atomicity
      const result = await prismaClient.$transaction(async (tx) => {
        // Step 1: Create multiple Barang records
        const idBarangArray = await Promise.all(
          barangDataArray.map((barangData) => barangService.create(barangData, penitipanData.id_penitip))
        );

        // Step 2: Create Penitipan record
        const penitipan = await tx.penitipan.create({
          data: {
            id_penitip: penitipanData.id_penitip,
            id_pegawai_qc: penitipanData.id_pegawai_qc,
            id_hunter: penitipanData.id_hunter || null, // Optional field
          },
        });

        // Step 3: Create DetailPenitipan records
        const detailPenitipanRecords = detailPenitipanDataArray.map((detail, index) => ({
          id_penitipan: penitipan.id_penitipan,
          id_barang: idBarangArray[index],
          tanggal_masuk: new Date(), // Defaults to now
          tanggal_akhir: new Date(detail.tanggal_akhir),
          batas_ambil: new Date(detail.batas_ambil),
          tanggal_laku: detail.tanggal_laku ? new Date(detail.tanggal_laku) : null,
          is_perpanjang: detail.is_perpanjang || false,
        }));

        const detailPenitipan = await tx.dtl_penitipan.createMany({
          data: detailPenitipanRecords,
        });

        return {
          penitipan,
          detailPenitipan: detailPenitipanRecords, // Return formatted input data
          barang: idBarangArray.map((id_barang) => ({ id_barang })),
          message: 'Barang, Penitipan, and DetailPenitipan created successfully',
        };
      });

      return result;
    } catch (error) {
      console.error('Error creating Penitipan:', error);
      throw new Error(`Failed to create Penitipan: ${error.message}`);
    }
}

export default {
  create
};
