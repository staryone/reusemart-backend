import notificationService from "../services/notifikasi.service.js";

const sendNotification = async (req, res, next) => {
  try {
    const result = await notificationService.sendNotification(req.body);
    res.status(200).json({
      data: result,
      message: "Notifikasi berhasil dikirim!",
    });
  } catch (e) {
    next(e);
  }
};

const getNotifications = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await notificationService.getNotifications(userId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateFcmToken = async (req, res, next) => {
  try {
    req.body.userId = req.session.user.id_user;
    console.log(req.body.userId);
    console.log("sampe disini");
    await notificationService.updateFcmToken(req.body);
    res.status(200).json({
      data: "OK",
      message: "FCM token updated successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  sendNotification,
  getNotifications,
  updateFcmToken,
};
