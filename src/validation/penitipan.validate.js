import Joi from "joi";

const createPenitipanValidation = Joi.object({
  tanggal_masuk: Joi.date().required(),
  tanggal_akhir: Joi.date().required(),
  tanggal_laku: Joi.date().optional(),
  batas_ambil: Joi.date().optional(),
  is_perpanjang: Joi.boolean().optional(),
  id_penitip: Joi.number().required(),
  id_hunter: Joi.number().optional(),
  id_pegawai_qc: Joi.number().required(),
});

export { createPenitipanValidation };
