import Joi from "joi";
import { JoiImage } from "../utils/joi_image_extended.util.js";

const createTransaksiValidation = Joi.object({
  id_pembeli: Joi.number().required(),
  id_barang: Joi.array().items(Joi.string().max(12)).required(),
  id_alamat: Joi.number().optional(),
  potongan_poin: Joi.number().optional(),
  metode_pengiriman: Joi.string().max(255).required(),
});

const updateBuktiPembayaranTransaksiValidation = Joi.array()
  .items(
    JoiImage.image()
      .allowedTypes(["jpg", "png", "jpeg"])
      .maxSize(2 * 1024 * 1024)
  )
  .max(1)
  .required();

const getTransaksiValidation = Joi.number().required();

export {
  createTransaksiValidation,
  getTransaksiValidation,
  updateBuktiPembayaranTransaksiValidation,
};
