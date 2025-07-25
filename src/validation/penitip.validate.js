import Joi from "joi";
import { JoiImage } from "../utils/joi_image_extended.util.js";

const createPenitipValidation = Joi.object({
  nomor_ktp: Joi.string().max(255).required(),
  foto_ktp: Joi.array()
    .items(
      JoiImage.image()
        .allowedTypes(["jpg", "png", "jpeg"])
        .maxSize(2 * 1024 * 1024)
    )
    .max(1)
    .required(),
  nama: Joi.string().max(255).required(),
  alamat: Joi.string().max(255).required(),
  nomor_telepon: Joi.string().max(15).required(),
  saldo: Joi.number().required(),
  rating: Joi.number().required(),
  total_review: Joi.number().required(),
  jumlah_review: Joi.number().required(),
  total_per_bulan: Joi.number().required(),
  is_top_seller: Joi.boolean().required(),
  id_user: Joi.number().required(),
  poin: Joi.number().required(),
});

const getPenitipValidation = Joi.string()
  .max(10)
  .pattern(/^[Tt]\d+$/, "T followed by numbers")
  .required();

const updatePenitipValidation = Joi.object({
  id_penitip: Joi.string()
    .max(10)
    .pattern(/^[Tt]\d+$/, "T followed by numbers")
    .required(),
  email: Joi.string().max(100).optional(),
  nomor_ktp: Joi.string().max(255).optional(),
  foto_ktp: Joi.array()
    .items(
      JoiImage.image()
        .allowedTypes(["jpg", "png", "jpeg"])
        .maxSize(2 * 1024 * 1024)
    )
    .max(1)
    .optional(),
  nama: Joi.string().max(255).optional(),
  alamat: Joi.string().max(255).optional(),
  nomor_telepon: Joi.string().max(15).optional(),
});

const updateSistemPenitipValidation = Joi.object({
  id_penitip: Joi.string()
    .max(10)
    .pattern(/^[Tt]\d+$/, "T followed by numbers")
    .required(),
  saldo: Joi.number().optional(),
  rating: Joi.number().optional(),
  total_review: Joi.number().optional(),
  jumlah_review: Joi.number().optional(),
  total_per_bulan: Joi.number().optional(),
  is_top_seller: Joi.boolean(),
  poin: Joi.number().optional(),
});

export {
  createPenitipValidation,
  getPenitipValidation,
  updatePenitipValidation,
  updateSistemPenitipValidation,
};
