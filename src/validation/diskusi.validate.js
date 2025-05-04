import Joi from "joi";

const createDiskusiValidation = Joi.object({});
const getDiskusiValidation = Joi.number().required();
const updateDiskusiValidation = Joi.object({});

export {
  createDiskusiValidation,
  getDiskusiValidation,
  updateDiskusiValidation,
};
