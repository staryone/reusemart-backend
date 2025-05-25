import ratingService from "../services/rating.service";
import { idToInteger } from "../utils/formater.util";

const updateRating = async (req, res, next) => {
  try {
    const id_barang = idToInteger(req.params.id);
    req.body.id_user = req.session.user.id_user;
    await ratingService.updateRating(id_barang,req.body);

    res.status(200).json({
      data: "OK",
      message: "Create diskusi berhasil!",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  updateRating
};
