import Joi from "joi";

const createPembeliValidation = Joi.object({
  nama: Joi.string().max(255).required(),
  nomor_telepon: Joi.string().max(15).required(),
  poin_loyalitas: Joi.number().required(),
  id_user: Joi.number().required(),
});

const getPembeliValidation = Joi.number().required();

const updatePoinPembeliValidation = Joi.number().required();

export {
  createPembeliValidation,
  getPembeliValidation,
  updatePoinPembeliValidation,
};
