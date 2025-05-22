import transaksiService from "../services/transaksi.service";

const create = async (req, res, next) => {
  try {
    req.body.id_pembeli = req.session.user.pembeli.id_pembeli;
    await transaksiService.create(req.body);
    res.status(200).json({
      data: "OK",
      message: "Create transaksi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

export default { create };
