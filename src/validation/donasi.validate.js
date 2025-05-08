import Joi from "joi";

const createDonasiValidation = Joi.object({
  nama_penerima: Joi.string().max(255).required(),
  id_barang: Joi.string().max(12).required(),
  id_request: Joi.number().required(),
  tanggal_donasi: Joi.date().optional() || Joi.string().optional(),
});
const getDonasiValidation = Joi.number().required();
const updateDonasiValidation = Joi.object({
  id_donasi: Joi.number().required(),
  nama_penerima: Joi.string().max(255).optional(),
  tanggal_donasi: Joi.date().optional() || Joi.string().optional(),
});

export { createDonasiValidation, getDonasiValidation, updateDonasiValidation };
