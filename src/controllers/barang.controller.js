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

export default {
  get,
  getList,
};
