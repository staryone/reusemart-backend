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

const updateBarangStatus = async (req, res) => {
  try {
    // Memanggil fungsi updateStatus dari service
    const result = await barangService.updateStatus(req.body);

    // Mengembalikan respons sukses
    res.status(200).json({
      status: "success",
      message: "Status barang berhasil diperbarui",
      data: result,
    });
  } catch (error) {
    // Menangani error
    res.status(400).json({
      status: "error",
      message: error.message || "Gagal memperbarui status barang",
    });
  }
};

export default {
  get,
  getList,
  updateBarangStatus,
};
