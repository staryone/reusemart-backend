import authService from "../services/auth.service.js";
import pembeliService from "../services/pembeli.service.js";

const register = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      role: "PEMBELI",
    };

    const createdUser = await authService.register(user);

    const pembeli = {
      id_user: createdUser.id_user,
      nama: req.body.nama,
      nomor_telepon: req.body.nomor_telepon,
      poin_loyalitas: 0,
    };

    let result = await pembeliService.create(pembeli);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await pembeliService.login(req.body);
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
    const result = await pembeliService.profile(id);

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
  profile,
};
