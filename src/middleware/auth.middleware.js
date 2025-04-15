import { prismaClient } from "../application/database.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const authPegawaiMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    jwt.verify(token, process.env.JWT_SECRET_KEY);

    const session = await prismaClient.session.findFirst({
      where: {
        token: token,
      },
      select: {
        expiresAt: true,
        user: true,
      },
    });

    if (!session || session.expiresAt < Date.now()) {
      if (session.expiresAt < Date.now()) {
        await prismaClient.session.delete({
          where: {
            token: token,
          },
        });
      }

      return res
        .status(401)
        .json({
          errors: "Akses ditolak, silahkan login ulang!",
        })
        .end();
    }

    if (session.user.role !== "PEGAWAI") {
      return res
        .status(401)
        .json({
          errors: "Akses ditolak, Anda bukan pegawai!",
        })
        .end();
    }

    req.session = session;
    next();
  } catch (e) {
    res
      .status(401)
      .json({
        errors: "Akses ditolak, token salah!",
      })
      .end();
  }
};

export const authAdminMiddleware = async (req, res, next) => {
  try {
    const user = req.session.user;

    const pegawai = await prismaClient.pegawai.findFirst({
      where: {
        AND: [
          { id_user: user.id_user },
          {
            jabatan: {
              nama_jabatan: "ADMIN",
            },
          },
        ],
      },
    });

    if (!pegawai) {
      throw new Error();
    }
    next();
  } catch (e) {
    res
      .status(401)
      .json({
        errors: "Akses ditolak, Anda bukan admin!",
      })
      .end();
  }
};
