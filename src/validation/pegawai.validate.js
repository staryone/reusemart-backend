import Joi from "joi";

const createPegawaiValidation = Joi.object({
    email: Joi.string().max(100).email().required(),
    nama: Joi.string().max(100).required(),
    nomor_telepon: Joi.string().max(15).required(),
    tgl_lahir: Joi.date().required(),
    id_jabatan: Joi.number().required(),
});

const loginPegawaiValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
});

const getPegawaiValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).optional(),
    nama: Joi.string().max(100).optional(),
    nomor_telepon: Joi.string().max(15).optional(),
    tgl_lahir: Joi.date().optional(),
    id_jabatan: Joi.number().optional(),
});

export {
    createPegawaiValidation,
    loginPegawaiValidation,
    getPegawaiValidation,
    updateUserValidation,
};
