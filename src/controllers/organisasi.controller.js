import authService from "../services/auth.service.js";
import organisasiService from "../services/organisasi.service.js";

const register = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password ? req.body.password : undefined,
      confirm_password: req.body.confirm_password
        ? req.body.confirm_password
        : undefined,
      role: "ORGANISASI",
    };

    const createdUser = await authService.register(user);

    const organisasi = {
      nama_organisasi: req.body.nama_organisasi,
      alamat: req.body.alamat,
      nomor_telepon: req.body.nomor_telepon,
      deskripsi: req.body.deskripsi,
      id_user: createdUser.id_user,
    };

    await organisasiService.create(organisasi);

    res.status(200).json({
      data: "OK",
      message: "Create organisasi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const profile = async (req, res, next) => {
  try {
    const id = req.session.user.id_user;
    const result = await organisasiService.profile(id);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await organisasiService.get(id);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const [listOrganisasi, totalItems] = await organisasiService.getList(
      req.query
    );

    res.status(200).json({
      data: listOrganisasi,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id_organisasi = req.params.id;
    const result = await organisasiService.update(req.body);

    res.status(200).json({
      data: "OK",
      message: "Update organisasi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    await organisasiService.destroy(req.params.id);
    res.status(200).json({
      data: "OK",
      message: "Hapus organisasi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  get,
  profile,
  update,
  destroy,
  getList,
};
