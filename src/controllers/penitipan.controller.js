import penitipanService from "../services/penitipan.service.js";
import { fileTypeFromBuffer } from "file-type";

const create = async (req, res, next) => {
  try {
    // Parse JSON fields from request body
    let { barangData, penitipanData, detailPenitipanData } = req.body;
    const parsedBarangData = JSON.parse(req.body.barangData);
    // Attach uploaded files to barangData and validate MIME types
    const files = req.files || [];

    // Distribute files to corresponding barangData entries
    const barangDataWithFiles = await Promise.all(
      parsedBarangData.map(async (barang, index) => {
        // Assume files are uploaded with field names like 'gambar[0]', 'gambar[1]', etc.
        const barangFiles = files.filter((file) => file.fieldname === `gambar[${index}]`);

        const validatedFiles = await Promise.all(
          barangFiles.map(async (file) => {
            const fileType = await fileTypeFromBuffer(file.buffer);
            return {
              originalname: file.originalname,
              mimetype: fileType.mime,
              buffer: file.buffer,
            };
          })
        );

        return {
          ...barang,
          gambar: validatedFiles,
        };
      })
    );


    // Call the service to create Penitipan, Barang, and DetailPenitipan
    const result = await penitipanService.create(
      barangDataWithFiles,
      penitipanData,
      detailPenitipanData
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
    console.log("\n\nMASUK CONTROLLER")
    const [listPenitipan, totalItems] = await penitipanService.getList(req.query);

    res.status(200).json({
      data: listPenitipan,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  getList
};