import Joi from "joi";

const createBarangValidation = Joi.object({
  nama_barang: Joi.string().max(255).required(),
  detail_barang: Joi.string().max(255).required(),
  id_pembeli: Joi.number().required(),
});
const getBarangValidation = Joi.string()
  .max(12)
  .pattern(/^([A-Za-z])\d+$/, "a letter followed by numbers")
  .required();

const updateBarangValidation = Joi.object({
  id_barang: Joi.string()
    .max(12)
    .pattern(/^([A-Za-z])\d+$/, "a letter followed by numbers")
    .required(),
  id_pembeli: Joi.number().required(),
  nama_barang: Joi.string().max(255).optional(),
  detail_barang: Joi.string().max(255).optional(),
  status_default: Joi.boolean().optional(),
});

const updateStatusBarangValidation = Joi.valid(
  "TERSEDIA",
  "DIDONASIKAN",
  "TERJUAL",
  "KEMBALI",
  "TERDONASI"
).required();

export { createBarangValidation, getBarangValidation, updateBarangValidation };
