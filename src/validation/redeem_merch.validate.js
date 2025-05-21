import Joi from "joi";

const createRedeemMerchValidation = Joi.object({
  id_pembeli: Joi.number().required(),
  id_merchandise: Joi.number().required(),
  jumlah_merch: Joi.number().required(),
});
const getRedeemMerchValidation = Joi.number().required();
const updateRedeemMerchValidation = Joi.object({
  id_redeem_merch: Joi.number().required(),
  tanggal_ambil: Joi.date().optional(),
  id_pembeli: Joi.number().required(),
  id_merchandise: Joi.number().required(),
  jumlah_merch: Joi.number().required(),
  status: Joi.valid(
      "BELUM_DIAMBIL",
      "SUDAH_DIAMBIL"
    ).optional(),
});

export {
  createRedeemMerchValidation,
  getRedeemMerchValidation,
  updateRedeemMerchValidation,
};
