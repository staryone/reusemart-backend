import Joi from "joi";

const createDiskusiValidation = Joi.object({
  pesan: Joi.string().max(255).required(),
  id_barang: Joi.string().required(),
  id_user: Joi.number().required(),
});
const getDiskusiValidation = Joi.number().required();

export { createDiskusiValidation, getDiskusiValidation };
