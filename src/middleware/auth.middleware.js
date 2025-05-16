import { prismaClient } from "../application/database.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.get("Authorization");

    console.log(token);

    if (token && String(token).startsWith("Bearer ")) {
      token = String(token).slice(7);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, () => {});

    const session = await prismaClient.session.findUnique({
      where: {
        token: token,
      },
      select: {
        id_session: true,
        expiresAt: true,
        user: {
          select: {
            id_user: true,
            role: true,
            pegawai: {
              select: {
                id_pegawai: true,
                jabatan: {
                  select: {
                    nama_jabatan: true,
                  },
                },
              },
            },
            penitip: {
              select: {
                id_penitip: true,
              },
            },
            pembeli: {
              select: {
                id_pembeli: true,
              },
            },
            organisasi: {
              select: {
                id_organisasi: true,
              },
            },
          },
        },
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
