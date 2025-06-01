import requestDonasiService from "../services/request_donasi.service.js";

const create = async (req, res, next) => {
  try {
    req.body.id_organisasi = req.session.user.organisasi.id_organisasi;
    await requestDonasiService.create(req.body);

    res.status(200).json({
      data: "OK",
      message: "Create request donasi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const id_organisasi = req.session.user.organisasi.id_organisasi;
    const id = req.params.id;
    const result = await requestDonasiService.get(id, id_organisasi);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const id_organisasi = req.session.user.organisasi.id_organisasi;
    const [listRequestDonasi, totalItems] = await requestDonasiService.getList(
      req.query,
      id_organisasi
    );

    res.status(200).json({
      data: listRequestDonasi,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

const getAllList = async (req, res, next) => {
  try {
    const [listRequestDonasi, totalItems] =
      await requestDonasiService.getAllList(req.query);

    res.status(200).json({
      data: listRequestDonasi,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id_request = req.params.id;
    req.body.id_organisasi = req.session.user.organisasi.id_organisasi;
    await requestDonasiService.update(req.body);

    res.status(200).json({
      data: "OK",
      message: "Update request donasi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const id_organisasi = req.session.user.organisasi.id_organisasi;
    await requestDonasiService.destroy(req.params.id, id_organisasi);
    res.status(200).json({
      data: "OK",
      message: "Hapus request donasi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const getRekapRequestDonasi = async (req, res, next) => {
  try {
    const [hasilData, totalItems] =
      await requestDonasiService.getRekapRequestDonasi(req.query);

    res.status(200).json({
      data: hasilData,
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
  getAllList,
  getRekapRequestDonasi,
  update,
  destroy,
};
