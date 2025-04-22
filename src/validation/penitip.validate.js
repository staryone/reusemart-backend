import Joi from "joi";

const createPenitipValidation = Joi.object({
  nomor_ktp: Joi.string().max(255).required(),
  nama: Joi.string().max(255).required(),
  alamat: Joi.string().max(255).required(),
  nomor_telepon: Joi.string().max(15).required(),
  id_user: Joi.number().required(),
});

const getPenitipValidation = Joi.string()
  .max(10)
  .pattern(/^[Tt]\d+$/, "T followed by numbers")
  .required();

const updatePenitipValidation = Joi.object({
  id_organisasi: Joi.string()
    .max(10)
    .pattern(/^[Tt]\d+$/, "T followed by numbers")
    .required(),
  nomor_ktp: Joi.string().max(255).optional,
  nama: Joi.string().max(255).required(),
  alamat: Joi.string().max(255).required(),
  nomor_telepon: Joi.string().max(15).required(),
  saldo: Joi,
});

export {
  createPenitipValidation,
  getPenitipValidation,
  updatePenitipValidation,
};
