import authService from "../services/auth.service.js";

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

const loginMobile = async (req, res, next) => {
  try {
    const result = await authService.loginMobile(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body.email);

    res.status(200).json({
      data: "OK",
      message: "Email reset password berhasil dikirim!",
    });
  } catch (e) {
    next(e);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    req.body.token = req.params.token;
    const result = await authService.resetPassword(req.body);
    await authService.resetAllSession(result.email);

    res.status(200).json({
      data: "OK",
      message: "Reset password berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

const checkValidToken = async (req, res, next) => {
  try {
    const token = req.params.token;
    await authService.checkValidToken(token);

    res.status(200).json({
      data: "OK",
      message: "Token valid!",
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
      data: "OK",
      message: "Logout berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  forgotPassword,
  resetPassword,
  checkValidToken,
  logout,
  login,
  loginMobile
};
