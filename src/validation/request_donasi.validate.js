import Joi from "joi";

const createRequestDonasiValidation = Joi.object({
  deskripsi: Joi.string().max(255).required(),
  id_organisasi: Joi.number().required(),
});
const getRequestDonasiValidation = Joi.number().required();
const updateRequestDonasiValidation = Joi.object({
  id_request: Joi.number().required(),
  deskripsi: Joi.string().max(255).required(),
  id_organisasi: Joi.number().required(),
});

export {
  createRequestDonasiValidation,
  getRequestDonasiValidation,
  updateRequestDonasiValidation,
};
