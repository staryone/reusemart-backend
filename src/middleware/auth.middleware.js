import { prismaClient } from "../application/database.js";

export const authPegawaiMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    res
      .status(401)
      .json({
        errors: "Akses ditolak!",
      })
      .end();
  } else {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) {
      res
        .status(401)
        .json({
          errors: "Akses ditolak!",
        })
        .end();
    } else {
      if (user.role !== "PEGAWAI") {
        res
          .status(401)
          .json({
            errors: "Akses ditolak!",
          })
          .end();
      } else {
        req.user = user;
        next();
      }
    }
  }
};
