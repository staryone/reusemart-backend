import Joi from "joi";

const createPegawaiValidation = Joi.object({
  nama: Joi.string().max(100).required(),
  nomor_telepon: Joi.string().max(15).required(),
  komisi: Joi.number(),
  tgl_lahir: Joi.date().required(),
  id_jabatan: Joi.number().required(),
  id_user: Joi.number().required(),
});

const getIdPegawaiValidation = Joi.string()
  .max(10)
  .pattern(/^[Pp]\d+$/, "P followed by numbers")
  .required();

const updatePegawaiValidation = Joi.object({
  id_pegawai: Joi.string()
    .max(10)
    .pattern(/^[Pp]\d+$/, "P followed by numbers")
    .required(),
  nama: Joi.string().max(100).optional(),
  nomor_telepon: Joi.string().max(15).optional(),
  komisi: Joi.number(),
  tgl_lahir: Joi.date().optional(),
  id_jabatan: Joi.number().optional(),
});

export {
  createPegawaiValidation,
  updatePegawaiValidation,
  getIdPegawaiValidation,
};
