export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.session.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res
        .status(401)
        .json({
          errors: `Akses ditolak, Hanya ${allowedRoles.join(
            " / "
          )} yang diperbolehkan!`,
        })
        .end();
    }

    if (req.session.user.pegawai.jabatan && allowedRoles.length > 1) {
      const jabatan = req.session.user.pegawai.jabatan.nama_jabatan;

      if (!allowedRoles.includes(String(jabatan).toUpperCase())) {
        return res
          .status(401)
          .json({
            errors: `Akses ditolak, Hanya ${allowedRoles
              .slice(1)
              .join(" / ")} yang diperbolehkan!`,
          })
          .end();
      }
    }

    next();
  };
};
