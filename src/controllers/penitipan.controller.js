import penitipanService from "../services/penitipan.service.js";
import { fileTypeFromBuffer } from "file-type";

const create = async (req, res, next) => {
  try {
    // Parse JSON fields from request body
    let { barangData, penitipanData, detailPenitipanData } = req.body;

    // Handle JSON string fields (if sent as strings)
    try {
      barangData = typeof barangData === 'string' ? JSON.parse(barangData) : barangData;
      penitipanData = typeof penitipanData === 'string' ? JSON.parse(penitipanData) : penitipanData;
      detailPenitipanData = typeof detailPenitipanData === 'string' ? JSON.parse(detailPenitipanData) : detailPenitipanData;
    } catch (error) {
      return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }

    // Attach uploaded files to barangData and validate MIME types
    const files = req.files || [];

    // Distribute files to corresponding barangData entries
    const barangDataWithFiles = await Promise.all(
      barangData.map(async (barang, index) => {
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
    const result = await penitipanService.createPenitipan(
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
  } catch (error) {
    console.error('Error in createPenitipan:', error);
    return res.status(error.message.includes('Invalid') || error.message.includes('required') ? 400 : 500).json({
      error: `Failed to create Penitipan: ${error.message}`,
    });
  }
};

export default {
  create,
};