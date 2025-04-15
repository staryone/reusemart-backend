import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import {
  loginAuthValidation,
  registerAuthValidation,
  updatePasswordAuthValidation,
} from "../validation/auth.validate.js";
import { validate } from "../validation/validate.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const login = async (request) => {
  const loginRequest = validate(loginAuthValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      email: true,
      password: true,
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

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      email: user.email,
    },
    select: {
      token: true,
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

const logout = async (email) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User tidak ditemukan!");
  }

  return prismaClient.user.update({
    where: {
      email: email,
    },
    data: {
      token: null,
    },
    select: {
      email: true,
    },
  });
};

const updatePassword = async (email, newPassword) => {
  newPassword = validate(updatePasswordAuthValidation, newPassword);

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User tidak ditemukan!");
  }

  user.password = bcrypt.hash(newPassword, 10);

  return prismaClient.user.update({
    where: {
      email: email,
    },
    data: user,
  });
};

export default { login, register, logout, updatePassword };
