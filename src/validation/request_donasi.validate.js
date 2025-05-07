import Joi from "joi";

const createRequestDonasiValidation = Joi.object({
  nama_request_donasi: Joi.string().max(255).required(),
  detail_request_donasi: Joi.string().max(255).required(),
  id_organisasi: Joi.number().required(),
});
const getRequestDonasiValidation = Joi.number().required();
const updateRequestDonasiValidation = Joi.object({
  id_request_donasi: Joi.number().required(),
  id_pembeli: Joi.number().required(),
  nama_request_donasi: Joi.string().max(255).optional(),
  detail_request_donasi: Joi.string().max(255).optional(),
  status_default: Joi.boolean().optional(),
});

export {
  createRequestDonasiValidation,
  getRequestDonasiValidation,
  updateRequestDonasiValidation,
};
