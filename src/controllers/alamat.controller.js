import alamatService from "../services/alamat.service.js";

const create = async (req, res, next) => {
  try {
    const result = await alamatService.create(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const id_pembeli = req.session.user.pembeli.id_pembeli;
    const id = req.params.id;
    const result = await alamatService.get(id, id_pembeli);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const id_pembeli = req.session.user.pembeli.id_pembeli;
    const listAlamat = await alamatService.getList(req.query, id_pembeli);

    res.status(200).json({
      data: listAlamat,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id_alamat = req.params.id;
    req.body.id_pembeli = req.session.user.pembeli.id_pembeli;
    const result = await alamatService.update(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const id_pembeli = req.session.user.pembeli.id_pembeli;
    await alamatService.destroy(req.params.id, id_pembeli);
    res.status(200).json({
      data: "Hapus alamat berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  getList,
  update,
  destroy,
};
