import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response.error.js";
import { validate } from "../validation/validate.js";
import { sendPushNotification } from "../application/firebase.js";
import {
  sendNotificationValidation,
  getNotificationsValidation,
  updateFcmTokenValidation,
} from "../validation/notifikasi.validate.js";

const sendNotification = async (request) => {
  const data = validate(sendNotificationValidation, request);

  const user = await prismaClient.user.findUnique({
    where: { id_user: data.user_id },
    select: { fcm_token: true },
  });

  if (!user) {
    return console.error("User tidak ditemukan!");
  }

  if (!user.fcm_token) {
    return console.error("FCM token tidak tersedia untuk user ini!");
  }

  // Store notifikasi in the database
  const notifikasi = await prismaClient.notifikasi.create({
    data: {
      id_user: data.user_id,
      judul: data.title,
      isi: data.body,
    },
  });

  const result = await sendPushNotification(
    user.fcm_token,
    data.title,
    data.body,
    {
      notifikasiId: notifikasi.id_notif.toString(),
    }
  );

  console.log(result);

  return notifikasi;
};

const getNotifications = async (userId) => {
  userId = validate(getNotificationsValidation, userId);

  const listNotifikasi = await prismaClient.notifikasi.findMany({
    where: { id_user: userId },
    orderBy: { created_at: "desc" },
  });

  return listNotifikasi;
};

const updateFcmToken = async (request) => {
  const data = validate(updateFcmTokenValidation, request);

  const user = await prismaClient.user.findUnique({
    where: { id_user: data.userId },
  });

  if (!user) {
    throw new ResponseError(404, "User tidak ditemukan!");
  }

  await prismaClient.user.update({
    where: { id_user: data.userId },
    data: { fcm_token: data.fcmToken },
  });

  return "OK";
};

export default {
  sendNotification,
  getNotifications,
  updateFcmToken,
};
