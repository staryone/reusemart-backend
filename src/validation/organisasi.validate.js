import Joi from "joi";

const createOrganisasiValidation = Joi.object({
  nama_organisasi: Joi.string().max(255).required(),
  alamat: Joi.string().max(255).required(),
  nomor_telepon: Joi.string().max(15).required(),
  deskripsi: Joi.string().max(255).required(),
  id_user: Joi.number().required(),
});

const getOrganisasiValidation = Joi.string()
  .max(12)
  .pattern(/^(ORG|org)\d+$/, "ORG followed by numbers")
  .required();

const updateOrganisasiValidation = Joi.object({
  id_organisasi: Joi.string()
    .max(12)
    .pattern(/^(ORG|org)\d+$/, "ORG followed by numbers")
    .required(),
  email: Joi.string().max(100).optional(),
  nama_organisasi: Joi.string().max(255).optional(),
  alamat: Joi.string().max(255).optional(),
  nomor_telepon: Joi.string().max(15).optional(),
  deskripsi: Joi.string().max(255).optional(),
});

export {
  createOrganisasiValidation,
  getOrganisasiValidation,
  updateOrganisasiValidation,
};
