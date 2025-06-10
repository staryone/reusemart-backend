import merchandiseService from "../services/merchandise.service.js";
import { ResponseError } from "../errors/response.error.js";

const get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await merchandiseService.get(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  try {
    const [listMerchandise, totalItems] = await merchandiseService.getList(
      req.query
    );
    res.status(200).json({
      data: listMerchandise,
      totalItems: totalItems,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await merchandiseService.update(id, req.body);
    res.status(200).json({
      data: result,
      message: "Merchandise berhasil diperbarui",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  get,
  getList,
  update,
};
