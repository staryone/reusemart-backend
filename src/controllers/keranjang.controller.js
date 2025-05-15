import keranjangService from "../services/keranjang.service.js";

const create = async (req, res, next) => {
  try {
    const id_pembeli = req.session.user.pembeli.id_pembeli;
    const keranjangData = {
      ...req.body,
      id_pembeli,
    };
    await keranjangService.create(keranjangData);

    res.status(200).json({
      data: "OK",
      message: "Create keranjang berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const id_pembeli = req.session.user.pembeli.id_pembeli;

    const [listKeranjang, totalItems] = await keranjangService.getList(
      req.query,
      id_pembeli
    );

    res.status(200).json({
      data: listKeranjang,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const id_pembeli = req.session.user.pembeli.id_pembeli;
    await keranjangService.destroy(req.params.id, id_pembeli);
    res.status(200).json({
      data: "OK",
      message: "Hapus keranjang berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  getList,
  destroy,
};
