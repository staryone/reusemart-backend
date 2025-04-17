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

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
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

export default { login, register, logout, updatePassword, resetAllSession };
