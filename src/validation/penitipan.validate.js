import Joi from "joi";

const createPenitipanValidation = Joi.object({
  id_penitip: Joi.number().required(),
  id_hunter: Joi.number().optional(),
  id_pegawai_qc: Joi.number().required(),
});

export { createPenitipanValidation };
