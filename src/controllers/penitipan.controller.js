import penitipanService from "../services/penitipan.service.js";
import { fileTypeFromBuffer } from "file-type";
import { idToInteger } from "../utils/formater.util.js";

const create = async (req, res, next) => {
  try {
    // Parse JSON fields from request body
    let { barangData, penitipanData, detailPenitipanData } = req.body;
    const parsedBarangData = JSON.parse(req.body.barangData);
    const parsedPenitipanData = JSON.parse(req.body.penitipanData);
    const parsedDetailPenitipanData = JSON.parse(req.body.detailPenitipanData);
    // Attach uploaded files to barangData and validate MIME types
    const files = req.files || [];

    // Distribute files to corresponding barangData entries
    const barangDataWithFiles = await Promise.all(
      parsedBarangData.map(async (barang, index) => {
        // barang.garansi = barang.garansi ? barang.garansi : undefined;
        // Assume files are uploaded with field names like 'gambar[0]', 'gambar[1]', etc.
        const barangFiles = files.filter(
          (file) => file.fieldname === `gambar[${index}]`
        );

        const validatedFiles = await Promise.all(
          barangFiles.map(async (file) => {
            const fileType = await fileTypeFromBuffer(file.buffer);
            return {
              originalname: file.originalname,
              mimetype: fileType.mime,
              buffer: file.buffer,
              encoding: file.encoding,
              fieldname: file.fieldname,
              size: file.size,
            };
          })
        );

        return {
          ...barang,
          gambar: validatedFiles,
        };
      })
    );

    parsedPenitipanData.id_penitip = idToInteger(
      parsedPenitipanData.id_penitip
    );
    parsedPenitipanData.id_pegawai_qc = idToInteger(
      parsedPenitipanData.id_pegawai_qc
    );
    parsedPenitipanData.id_hunter = parsedPenitipanData.id_hunter ? idToInteger(parsedPenitipanData.id_hunter) : undefined;

    //  console.log("\n\n",parsedBarangData);
    // Call the service to create Penitipan, Barang, and DetailPenitipan
    const result = await penitipanService.create(
      barangDataWithFiles,
      parsedPenitipanData,
      parsedDetailPenitipanData
    );

    // Return success response
    return res.status(201).json({
      message: result.message,
      data: {
        penitipan: result.penitipan,
        barang: result.barang,
        detailPenitipan: result.detailPenitipan,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const [listPenitipan, totalItems] = await penitipanService.getList(
      req.query
    );

    res.status(200).json({
      data: listPenitipan,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};
const getLaporanKomisi = async (req, res, next) => {
  try {
    const [listPenitipan, totalItems] = await penitipanService.getLaporanKomisi(
      req.query
    );

    res.status(200).json({
      data: listPenitipan,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

const getLaporanPenjualanBulanan = async (req, res, next) => {
  try {
    const [hasilData, totalItems] = await penitipanService.getLaporanPenjualanBulanan(
      req.query
    );

    res.status(200).json({
      data: hasilData,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    // Extract id_dtl_penitipan from URL parameters
    const { id } = req.params;

    // Parse JSON fields from request body
    const parsedBarangData = JSON.parse(req.body.barangData);
    const parsedPenitipanData = JSON.parse(req.body.penitipanData);
    const parsedDetailPenitipanData = JSON.parse(req.body.detailPenitipanData);
    const parsedExistingGambar = JSON.parse(req.body.existingGambar);

    // Attach uploaded files to barangData and validate MIME types
    const files = req.files || [];

    // Distribute files to corresponding barangData entries
    const barangDataWithFiles = await Promise.all(
      parsedBarangData.map(async (barang, index) => {
        // Assume files are uploaded with field names like 'gambar[0]', 'gambar[1]', etc.
        const barangFiles = files.filter(
          (file) => file.fieldname === `gambar[${index}]`
        );

        const validatedFiles = await Promise.all(
          barangFiles.map(async (file) => {
            const fileType = await fileTypeFromBuffer(file.buffer);
            return {
              originalname: file.originalname,
              mimetype: fileType.mime,
              buffer: file.buffer,
              encoding: file.encoding,
              fieldname: file.fieldname,
              size: file.size,
            };
          })
        );

        return {
          ...barang,
          gambar: validatedFiles,
        };
      })
    );

    // Validate and parse IDs
    parsedPenitipanData.id_penitip = idToInteger(
      parsedPenitipanData.id_penitip
    );
    parsedPenitipanData.id_pegawai_qc = idToInteger(
      parsedPenitipanData.id_pegawai_qc
    );
    parsedPenitipanData.id_hunter = parsedPenitipanData.id_hunter
      ? idToInteger(parsedPenitipanData.id_hunter)
      : undefined;

    // Call the service to update Penitipan, Barang, and DetailPenitipan
    const result = await penitipanService.update(
      id,
      barangDataWithFiles,
      parsedPenitipanData,
      parsedDetailPenitipanData,
      parsedExistingGambar
    );

    // Return success response
    return res.status(200).json({
      message: result.message,
      data: {
        penitipan: result.penitipan,
        barang: result.barang,
        detailPenitipan: result.detailPenitipan,
      },
    });
  } catch (e) {
    next(e);
  }
};

const extendPenitipan = async (req, res, next) => {
  try {
    // Extract id_dtl_penitipan from URL parameters
    const { id_dtl_penitipan } = req.params;

    // Call the service to extend DetailPenitipan
    const result = await penitipanService.extendPenitipan(id_dtl_penitipan);

    // Return success response
    return res.status(200).json({
      message: result.message,
      data: {
        detailPenitipan: result.detailPenitipan,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  getList,
  getLaporanKomisi,
  getLaporanPenjualanBulanan,
  update,
  extendPenitipan,
};
