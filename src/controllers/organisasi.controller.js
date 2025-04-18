import authService from "../services/auth.service.js";
import organisasiService from "../services/organisasi.service.js";
import { formatStringDate } from "../utils/date.util.js";

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

    let result = await organisasiService.create(organisasi);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await organisasiService.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.session.id_session;
    await authService.logout(id);

    res.status(200).json({
      data: "Logout berhasil!",
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
    const listOrganisasi = await organisasiService.getList(req.query);

    res.status(200).json({
      data: listOrganisasi,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id_organisasi = req.params.id;
    const result = await organisasiService.update(req.body);
    console.log(result);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    await organisasiService.destroy(req.params.id);
    res.status(200).json({
      data: "Hapus organisasi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const changePassword = async (req, res, next) => {
  try {
    req.body.email = req.session.user.email;
    await authService.updatePassword(req.body);
    await authService.resetAllSession(req.body.email);

    res.status(200).json({
      data: "Ubah password berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    console.log("test");
    const result = await authService.forgotPassword(req.body.email);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  logout,
  get,
  profile,
  update,
  destroy,
  changePassword,
  forgotPassword,
  getList,
};
