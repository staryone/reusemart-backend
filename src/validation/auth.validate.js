import Joi from "joi";

const loginAuthValidation = Joi.object({
  email: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const registerAuthValidation = Joi.object({
  email: Joi.string().max(100).email().required(),
  password: Joi.string().max(100).required(),
  role: Joi.string().valid("PEGAWAI", "ORGANISASI", "PEMBELI", "PENITIP"),
});

export { loginAuthValidation, registerAuthValidation };
