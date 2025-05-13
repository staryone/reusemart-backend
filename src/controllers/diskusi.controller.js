import diskusiService from "../services/diskusi.service.js";

const create = async (req, res, next) => {
  try {
    req.body.id_user = req.session.user.id_user;
    await diskusiService.create(req.body);

    res.status(200).json({
      data: "OK",
      message: "Create diskusi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await diskusiService.get(id);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const [listDiskusi, totalItems] = await diskusiService.getList(req.query);

    res.status(200).json({
      data: listDiskusi,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

const getListByIdBarang = async (req, res, next) => {
  try {
    const id_barang = req.params.idBarang;
    const [listDiskusi, totalItems] = await diskusiService.getListByIdBarang(
      req.query,
      id_barang
    );

    res.status(200).json({
      data: listDiskusi,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  getList,
  getListByIdBarang,
};
