import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import {
  getAuthValidation,
  loginAuthValidation,
  registerAuthValidation,
  updatePasswordAuthValidation,
} from "../validation/auth.validate.js";
import { validate } from "../validation/validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import "dotenv/config";

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

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "Email atau password salah!");
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  return prismaClient.session.create({
    data: {
      id_user: user.id_user,
      token: token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    select: {
      token: true,
      user: {
        select: {
          role: true,
        },
      },
    },
  });
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
  return prismaClient.session.delete({
    where: {
      id_session: id,
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

const forgotPassword = async (email) => {
  email = validate(getAuthValidation, email);

  const countUser = await prismaClient.user.count({
    where: {
      email: email,
    },
  });

  if (countUser !== 1) {
    throw new ResponseError(404, "User tidak ditemukan!");
  }

  const token = crypto.randomBytes(20).toString("hex");

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const mailOptions = {
    from: "reusemart.my.id@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
  };

  const result = transporter.sendMail(mailOptions, (err) => {
    if (err) {
      throw new ResponseError(500, err.message);
    }

    return `Email berhasil dikirim: ${info.response}`;
  });

  await prismaClient.user.update({
    where: {
      email: email,
    },
    data: {
      token: token,
    },
  });

  return result;
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
  register,
  logout,
  updatePassword,
  forgotPassword,
  resetAllSession,
};
