import transaksiService from "../services/transaksi.service.js";

const create = async (req, res, next) => {
  try {
    const dataTransaksi = JSON.parse(req.body.dataTransaksi);
    dataTransaksi.id_pembeli = req.session.user.pembeli.id_pembeli;

    if (dataTransaksi.id_alamat === null) delete dataTransaksi.id_alamat;

    const result = await transaksiService.create(dataTransaksi);
    res.status(200).json({
      data: result,
      message: "Create transaksi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

export default { create };
