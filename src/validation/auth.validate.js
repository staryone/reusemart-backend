import Joi from "joi";

const loginAuthValidation = Joi.object({
  email: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const registerAuthValidation = Joi.object({
  email: Joi.string().max(100).email().required(),
  password: Joi.string().min(8).required(),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": "Confirm password is required",
      "any.only": "Confirm password does not match password",
      "any.required": "Confirm password is required",
    }),
  role: Joi.string().valid("PEGAWAI", "ORGANISASI", "PEMBELI", "PENITIP"),
});

const updatePasswordAuthValidation = Joi.object({
  email: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const tokenResetAuthValidation = Joi.string().max(255).required();

const resetPasswordAuthValidation = Joi.object({
  token: Joi.string().max(255).required(),
  new_password: Joi.string().max(100).required(),
  confirm_new_password: Joi.string()
    .valid(Joi.ref("new_password"))
    .required()
    .messages({
      "string.empty": "Confirm password is required",
      "any.only": "Confirm password does not match password",
      "any.required": "Confirm password is required",
    }),
});

const getAuthValidation = Joi.string().email().required();
const getIdAuthValidation = Joi.number().required();

export {
  loginAuthValidation,
  registerAuthValidation,
  updatePasswordAuthValidation,
  getAuthValidation,
  getIdAuthValidation,
  resetPasswordAuthValidation,
  tokenResetAuthValidation,
};
