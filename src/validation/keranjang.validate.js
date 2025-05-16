import Joi from "joi";

const createKeranjangValidation = Joi.object({
  id_barang: Joi.string().required(),
  id_pembeli: Joi.number().required(),
});

const updateStatusKeranjangValidation = Joi.boolean().required();
const getKeranjangValidation = Joi.number().required();

export { createKeranjangValidation, getKeranjangValidation,  updateStatusKeranjangValidation};
