import { prismaClient } from "../application/database.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    jwt.verify(token, process.env.JWT_SECRET_KEY, () => {
      
    });

    const session = await prismaClient.session.findUnique({
      where: {
        token: token,
      },
      select: {
        id_session: true,
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

    if (session.user.role === "PEGAWAI") {
      session.user.pegawai = await prismaClient.pegawai.findUnique({
        where: {
          id_user: session.user.id_user,
        },
        select: {
          jabatan: true,
        },
      });
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
