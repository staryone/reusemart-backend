import authService from "../services/auth.service.js";
import pegawaiService from "../services/pegawai.service.js";
import { formatStringDate } from "../utils/date_util.js";

const register = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.tgl_lahir
        ? formatStringDate(req.body.tgl_lahir)
        : undefined,
      role: "PEGAWAI",
    };

    const createdUser = await authService.register(user);

    const pegawai = {
      nama: req.body.nama,
      nomor_telepon: req.body.nomor_telepon,
      komisi: 0,
      tgl_lahir: req.body.tgl_lahir ? new Date(req.body.tgl_lahir) : undefined,
      id_jabatan: req.body.id_jabatan,
      id_user: createdUser.id_user,
    };

    let result = await pegawaiService.create(pegawai);
    result.email = createdUser.email;

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const email = req.session.user.email;
    const result = await pegawaiService.get(email);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.session.token;
    await authService.logout(token);

    res.status(200).json({
      data: "Logout berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const changePassword = async (req, res, next) => {
  try {
    req.body.email = req.session.user.email;
    await authService.updatePassword(req.body);

    res.status(200).json({
      data: "Ubah password berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await authService.updatePassword(req.body);

    res.status(200).json({
      data: "Reset password berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const listPegawai = await pegawaiService.getList();

    res.status(200).json({
      data: listPegawai,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  get,
  login,
  logout,
  changePassword,
  resetPassword,
  getList,
};
