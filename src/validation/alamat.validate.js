import Joi from "joi";

const createAlamatValidation = Joi.object({
  nama_alamat: Joi.string().max(255).required(),
  detail_alamat: Joi.string().max(255).required(),
  id_pembeli: Joi.number().required(),
});
const getAlamatValidation = Joi.number().required();
const updateAlamatValidation = Joi.object({
  id_alamat: Joi.number().required(),
  id_pembeli: Joi.number().required(),
  nama_alamat: Joi.string().max(255).optional(),
  detail_alamat: Joi.string().max(255).optional(),
  status_default: Joi.boolean().optional(),
});

export { createAlamatValidation, getAlamatValidation, updateAlamatValidation };
