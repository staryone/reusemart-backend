import Joi from "joi";

const createTransaksiValidation = Joi.object({
  id_pembeli: Joi.number().required(),
  id_barang: Joi.array().items(Joi.string().max(12)).required(),
  id_alamat: Joi.number().optional(),
  potongan_poin: Joi.number().optional(),
  metode_pengiriman: Joi.string().max(255).required(),
});

const getTransaksiValidation = Joi.number().required();

export { createTransaksiValidation, getTransaksiValidation };
