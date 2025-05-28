import express from "express";
import notificationController from "../controllers/notifikasi.controller.js";
import { restrictTo } from "../middleware/restrictTo.middleware.js";

const notificationRouter = express.Router();

notificationRouter.get(
  "/api/notifications/:userId",
  restrictTo("PENITIP", "PEMBELI", "PEGAWAI", "KURIR", "HUNTER"),
  notificationController.getNotifications
);

notificationRouter.post(
  "/api/users/update-fcm",
  restrictTo("PENITIP", "PEMBELI", "PEGAWAI", "KURIR", "HUNTER"),
  notificationController.updateFcmToken
);

export default notificationRouter;
