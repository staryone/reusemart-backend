import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import {
  getAuthValidation,
  loginAuthValidation,
  registerAuthValidation,
  resetPasswordAuthValidation,
  tokenResetAuthValidation,
  updatePasswordAuthValidation,
} from "../validation/auth.validate.js";
import { validate } from "../validation/validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";
import { renderMailHtml, sendMail } from "../application/mail.js";

const login = async (request) => {
  const loginRequest = validate(loginAuthValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      id_user: true,
      email: true,
      password: true,
      role: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Email atau password salah!");
  }

  const dataToEncode = {
    role: user.role,
  };

  if (user.role === "PEGAWAI") {
    const pegawai = await prismaClient.pegawai.findUnique({
      where: {
        id_user: user.id_user,
      },
      select: {
        jabatan: {
          select: {
            nama_jabatan: true,
          },
        },
      },
    });

    dataToEncode.jabatan = pegawai.jabatan.nama_jabatan;
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "Email atau password salah!");
  }

  const token = jwt.sign(dataToEncode, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  return prismaClient.session.create({
    data: {
      id_user: user.id_user,
      token: token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    select: {
      token: true,
    },
  });
};

const loginMobile = async (request) => {
  const loginRequest = validate(loginAuthValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      id_user: true,
      email: true,
      password: true,
      role: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Email atau password salah!");
  }

  const dataToEncode = {
    role: user.role,
  };

  if (user.role === "PEGAWAI") {
    const pegawai = await prismaClient.pegawai.findUnique({
      where: {
        id_user: user.id_user,
      },
      select: {
        jabatan: {
          select: {
            nama_jabatan: true,
          },
        },
      },
    });

    if (
      pegawai.jabatan.nama_jabatan === "OWNER" ||
      pegawai.jabatan.nama_jabatan === "ADMIN" ||
      pegawai.jabatan.nama_jabatan === "GUDANG" ||
      pegawai.jabatan.nama_jabatan === "CS"
    ) {
      throw new ResponseError(400, "Credentials tidak valid!");
    }

    dataToEncode.jabatan = pegawai.jabatan.nama_jabatan;
  }

  if (user.role === "ORGANISASI") {
    throw new ResponseError(400, "Credentials tidak valid!");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "Email atau password salah!");
  }

  const token = jwt.sign(dataToEncode, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  const session = await prismaClient.session.create({
    data: {
      id_user: user.id_user,
      token: token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    select: {
      token: true,
    },
  });

  return {
    token: session.token,
    userId: user.id_user,
    role: dataToEncode.jabatan ? dataToEncode.jabatan : dataToEncode.role,
  };
};

const register = async (user) => {
  const registerRequest = validate(registerAuthValidation, user);

  const countUser = await prismaClient.user.count({
    where: {
      email: registerRequest.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Email sudah terdaftar!");
  }

  delete registerRequest.confirm_password;

  registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

  return prismaClient.user.create({
    data: registerRequest,
    select: {
      id_user: true,
      email: true,
    },
  });
};

const logout = async (id) => {
  const deletedSession = await prismaClient.session.delete({
    where: {
      id_session: id,
    },
    select: {
      user: {
        select: {
          id_user: true,
        },
      },
    },
  });

  return "OK";
};

const logoutMobile = async (id) => {
  const deletedSession = await prismaClient.session.delete({
    where: {
      id_session: id,
    },
    select: {
      user: {
        select: {
          id_user: true,
        },
      },
    },
  });

  return prismaClient.user.update({
    where: {
      id_user: deletedSession.user.id_user,
    },
    data: {
      fcm_token: null,
    },
  });
};

const updatePassword = async (request) => {
  const data = validate(updatePasswordAuthValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User tidak ditemukan!");
  }

  user.password = await bcrypt.hash(data.password, 10);

  return prismaClient.user.update({
    where: {
      email: data.email,
    },
    data: user,
  });
};

const resetPassword = async (request) => {
  const data = validate(resetPasswordAuthValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      token: data.token,
    },
  });

  if (!user) {
    throw new ResponseError(
      404,
      "Reset password gagal, token tidak ditemukan!"
    );
  }

  user.password = await bcrypt.hash(data.new_password, 10);
  user.token = null;

  return prismaClient.user.update({
    where: {
      token: data.token,
    },
    data: user,
    select: {
      email: true,
    },
  });
};

const forgotPassword = async (email) => {
  email = validate(getAuthValidation, email);

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    include: {
      organisasi: true,
      penitip: true,
      pembeli: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User tidak ditemukan!");
  }

  if (user.role === "PEGAWAI") {
    throw new ResponseError(403, "Akses ditolak!");
  }

  if (user.pembeli) {
    user.name = user.pembeli.nama;
  } else if (user.organisasi) {
    user.name = user.organisasi.nama_organisasi;
  } else {
    user.name = user.penitip.nama;
  }

  const token = crypto.randomBytes(20).toString("hex");

  const contentMail = await renderMailHtml("reset-password-sent.ejs", {
    name: user.name,
    email: user.email,
    resetLink: `http://localhost:3000/reset-password/${token}`,
  });

  const mailOptions = {
    from: "reusemart.my.id@gmail.com",
    to: email,
    subject: "Password Reset",
    html: String(contentMail),
  };

  console.log(await sendMail(mailOptions));

  await prismaClient.user.update({
    where: {
      email: email,
    },
    data: {
      token: token,
    },
  });

  return "OK";
};

const checkValidToken = async (token) => {
  token = validate(tokenResetAuthValidation, token);

  const countToken = await prismaClient.user.count({
    where: {
      token: token,
    },
  });

  console.log(countToken);

  if (!countToken) {
    throw new ResponseError(404, "Token tidak valid!");
  }

  return true;
};

const resetAllSession = async (email) => {
  email = validate(getAuthValidation, email);

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id_user: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User tidak ditemukan!");
  }

  return prismaClient.session.deleteMany({
    where: {
      id_user: user.id_user,
    },
  });
};

export default {
  login,
  loginMobile,
  register,
  logout,
  logoutMobile,
  updatePassword,
  forgotPassword,
  resetPassword,
  resetAllSession,
  checkValidToken,
};
