import donasiService from "../services/donasi.service.js";

const create = async (req, res, next) => {
  try {
    await donasiService.create(req.body);

    res.status(200).json({
      data: "OK",
      message: "Create donasi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await donasiService.get(id);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const id_organisasi = req.params.idOrganisasi;
    console.log(id_organisasi);
    const listDonasi = await donasiService.getList(req.query, id_organisasi);

    res.status(200).json({
      data: listDonasi,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id_donasi = req.params.id;
    await donasiService.update(req.body);

    res.status(200).json({
      data: "OK",
      message: "Update donasi berhasil!",
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
};
