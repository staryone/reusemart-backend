import barangService from "../services/barang.service.js";

const get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await barangService.get(id);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const [listBarang, totalItems] = await barangService.getList(req.query);

    res.status(200).json({
      data: listBarang,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

// const updateBarangStatus = async (req, res, next) => {
//   try {
//     const id_penitip = req.session.user.penitip.id_penitip;
//     console.log(req.body);
//     const result = await barangService.updateStatus(req.body, id_penitip);

//     res.status(200).json({
//       status: "success",
//       message: "Status barang berhasil diperbarui",
//     });
//   } catch (e) {
//     next(e);
//   }
// };
const updateBarangStatus = async (req, res, next) => {
  try {
    const { role, pegawai } = req.session.user;

    if (!["PEGAWAI", "GUDANG"].includes(role)) {
      throw new ResponseError(
        403,
        "Unauthorized: Only PEGAWAI or GUDANG roles are allowed"
      );
    }

    if (!pegawai?.id_pegawai) {
      throw new ResponseError(400, "Pegawai ID not found in session");
    }

    const userId = pegawai.id_pegawai;

    console.log("Request body:", req.body);
    console.log("User role:", role, "User ID:", userId);

    const result = await barangService.updateStatus(req.body, userId, role);

    res.status(200).json({
      status: "success",
      message: "Status barang berhasil diperbarui",
    });
  } catch (e) {
    console.error("Error in updateBarangStatus:", e);
    next(e);
  }
};

export default {
  get,
  getList,
  updateBarangStatus,
};
