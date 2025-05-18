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

    // Validate request data
    if (!Array.isArray(barangData) || barangData.length === 0) {
      return res.status(400).json({ error: 'barangData must be a non-empty array' });
    }
    if (!penitipanData || !penitipanData.id_penitip || !penitipanData.id_pegawai_qc) {
      return res.status(400).json({ error: 'penitipanData with id_penitip and id_pegawai_qc is required' });
    }
    if (
      !Array.isArray(detailPenitipanData) ||
      detailPenitipanData.length === 0 ||
      detailPenitipanData.length !== barangData.length
    ) {
      return res.status(400).json({ error: 'detailPenitipanData must be an array matching barangData length' });
    }

    // Attach uploaded files to barangData and validate MIME types
    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ error: 'At least one image file is required for barang' });
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    const MIN_IMAGES_PER_BARANG = 2;

    // Distribute files to corresponding barangData entries
    const barangDataWithFiles = await Promise.all(
      barangData.map(async (barang, index) => {
        // Assume files are uploaded with field names like 'gambar[0]', 'gambar[1]', etc.
        const barangFiles = files.filter((file) => file.fieldname === `gambar[${index}]`);
        if (barangFiles.length < MIN_IMAGES_PER_BARANG) {
          throw new Error(
            `At least ${MIN_IMAGES_PER_BARANG} image files are required for barang at index ${index}`
          );
        }

        // Validate and set MIME type for each file
        const validatedFiles = await Promise.all(
          barangFiles.map(async (file) => {
            const fileType = await fileTypeFromBuffer(file.buffer);
            if (!fileType || !allowedMimeTypes.includes(fileType.mime)) {
              throw new Error(
                `Invalid file type for ${file.originalname}. Only JPEG and PNG are allowed.`
              );
            }
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

    // Validate the complete request data
    const validatedData = validate(createPenitipanValidation, {
      barangData: barangDataWithFiles,
      penitipanData,
      detailPenitipanData,
    });

    // Call the service to create Penitipan, Barang, and DetailPenitipan
    const result = await penitipanService.createPenitipan(
      validatedData.barangData,
      validatedData.penitipanData,
      validatedData.detailPenitipanData
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