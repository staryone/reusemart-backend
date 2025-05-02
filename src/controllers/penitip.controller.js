import authService from "../services/auth.service.js";
import penitipService from "../services/penitip.service.js";
import { formatStringDate } from "../utils/date.util.js";
import { fileTypeFromBuffer } from "file-type";

const register = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      role: "PENITIP",
    };

    const createdUser = await authService.register(user);

    const fileType = await fileTypeFromBuffer(req.files[0].buffer);
    req.files[0].mimetype = fileType.mime;

    const penitip = {
      id_user: createdUser.id_user,
      nomor_ktp: req.body.nomor_ktp,
      foto_ktp: req.files,
      nama: req.body.nama,
      alamat: req.body.alamat,
      nomor_telepon: req.body.nomor_telepon,
      saldo: 0,
      rating: 0,
      total_review: 0,
      jumlah_review: 0,
      total_per_bulan: 0,
      is_top_seller: false,
      poin: 0,
    };

    let result = await penitipService.create(penitip);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await penitipService.login(req.body);
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
    const result = await penitipService.profile(id);

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
    const result = await penitipService.get(id);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const listPenitip = await penitipService.getList(req.query);

    res.status(200).json({
      data: listPenitip,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id_penitip = req.params.id;
    const result = await penitipService.update(req.body);
    console.log(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    await penitipService.destroy(req.params.id);
    res.status(200).json({
      data: "Hapus penitip berhasil!",
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
  getList,
};
