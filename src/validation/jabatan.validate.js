import Joi from "joi";

const createJabatanValidation = Joi.string().max(255).required();
const getJabatanValidation = Joi.number().required();
const updateJabatanValidation = Joi.object({
  id_jabatan: Joi.number().required(),
  nama_jabatan: Joi.string().max(255).required(),
});

export {
  createJabatanValidation,
  getJabatanValidation,
  updateJabatanValidation,
};
