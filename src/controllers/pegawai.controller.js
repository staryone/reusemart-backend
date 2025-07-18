import authService from "../services/auth.service.js";
import pegawaiService from "../services/pegawai.service.js";
import { formatStringDate } from "../utils/date.util.js";

const register = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.tgl_lahir
        ? formatStringDate(req.body.tgl_lahir)
        : undefined,
      confirm_password: req.body.tgl_lahir
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

    await pegawaiService.create(pegawai);

    res.status(200).json({
      data: "OK",
      message: "Create pegawai berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const profile = async (req, res, next) => {
  try {
    const id = req.session.user.id_user;
    const result = await pegawaiService.profile(id);

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
    const result = await pegawaiService.get(id);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const [listPegawai, countPegawai] = await pegawaiService.getList(req.query);

    res.status(200).json({
      data: listPegawai,
      totalItems: countPegawai,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id_pegawai = req.params.id;
    console.log(req.body);
    const result = await pegawaiService.update(req.body);
    console.log(result);

    res.status(200).json({
      data: "OK",
      message: "Update pegawai berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    await pegawaiService.destroy(req.params.id);
    res.status(200).json({
      data: "OK",
      message: "Hapus pegawai berhasil!",
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
      data: "OK",
      message: "Ubah password pegawai berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const user = await pegawaiService.get(req.params.id);
    req.body.email = user.email;
    req.body.password = formatStringDate(user.tgl_lahir);

    await authService.updatePassword(req.body);
    await authService.resetAllSession(req.body.email);

    res.status(200).json({
      data: "OK",
      message: "Reset password pegawai berhasil!",
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
  changePassword,
  resetPassword,
  getList,
};
