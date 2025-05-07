import jabatanService from "../services/jabatan.service.js";

const create = async (req, res, next) => {
  try {
    await jabatanService.create(req.body.nama_jabatan);

    res.status(200).json({
      data: "OK",
      message: "Create jabatan berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await jabatanService.get(id);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const [listJabatan, totalItems] = await jabatanService.getList(req.query);

    res.status(200).json({
      data: listJabatan,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id_jabatan = req.params.id;
    await jabatanService.update(req.body);

    res.status(200).json({
      data: "OK",
      message: "Update jabatan berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    await jabatanService.destroy(req.params.id);
    res.status(200).json({
      data: "OK",
      message: "Hapus jabatan berhasil!",
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
