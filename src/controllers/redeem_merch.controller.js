import redeemMerchService from "../services/redeem_merch.service.js";

const create = async (req, res, next) => {
  try {
    const id_pembeli = req.session.user.pembeli.id_pembeli;
    const redeemMerchData = {
      ...req.body,
      id_pembeli,
    };
    await redeemMerchService.create(redeemMerchData);

    res.status(200).json({
      data: "OK",
      message: "Create redeem merch berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const id_pembeli = req.session.user.pembeli.id_pembeli;
    const id = req.params.id;
    const result = await redeemMerchService.get(id, id_pembeli);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// const getList = async (req, res, next) => {
//   try {
//     const id_pembeli = req.session.user.pembeli.id_pembeli;
//     const listRedeemMerch = await redeemMerchService.getList(req.query, id_pembeli);

//     res.status(200).json({
//       data: listRedeemMerch,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

const getAllList = async (req, res, next) => {
  try {
    const [listRedeemMerch, totalItems] =
      await redeemMerchService.getAllList(req.query);

    res.status(200).json({
      data: listRedeemMerch,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id_redeem_merch = req.params.id;
    await redeemMerchService.update(req.body);

    res.status(200).json({
      data: "OK",
      message: "Update redeemMerch berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  getAllList,
  update,
};
