import Joi from "joi";
import { JoiImage } from "../utils/joi_image_extended.util.js";

const createBarangValidation = Joi.object({
  prefix: Joi.string().required(),
  nama_barang: Joi.string().max(255).required(),
  deskripsi: Joi.string().max(255).required(),
  harga: Joi.number().required(),
  garansi: Joi.date().optional(),
  berat: Joi.number().required(),
  id_kategori: Joi.number().required(),
  gambar: Joi.array()
    .items(
      JoiImage.image()
        .allowedTypes(["jpg", "png", "jpeg"])
        .maxSize(2 * 1024 * 1024)
    )
    .min(2)
    .required(),
});
const getBarangValidation = Joi.string()
  .max(12)
  .pattern(/^([A-Za-z])\d+$/, "a letter followed by numbers")
  .required();

const updateBarangValidation = Joi.object({
  prefix: Joi.string().optional(),
  id_barang: Joi.string()
    .max(12)
    .pattern(/^([A-Za-z])\d+$/, "a letter followed by numbers")
    .required(),
  nama_barang: Joi.string().max(255).optional(),
  deskripsi: Joi.string().max(255).optional(),
  harga: Joi.number().optional(),
  garansi: Joi.date().optional(),
  berat: Joi.number().optional(),
  id_kategori: Joi.number().optional(),
  gambar: Joi.array()
    .items(
      JoiImage.image()
        .allowedTypes(["jpg", "png", "jpeg"])
        .maxSize(2 * 1024 * 1024)
    )
    .optional(),
});

const updateStatusBarangValidation = Joi.object({
  id_barang: Joi.string()
    .max(12)
    .pattern(/^([A-Za-z])\d+$/, "a letter followed by numbers")
    .required(),
  status: Joi.valid(
    "TERSEDIA",
    "DIDONASIKAN",
    "MENUNGGU_KEMBALI",
    "TERJUAL",
    "KEMBALI",
    "TERDONASI"
  ).required(),
});

export {
  createBarangValidation,
  getBarangValidation,
  updateBarangValidation,
  updateStatusBarangValidation,
};
