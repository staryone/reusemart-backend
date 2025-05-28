import Joi from "joi";

const sendNotificationValidation = Joi.object({
  user_id: Joi.number().required(),
  title: Joi.string().max(255).required(),
  body: Joi.string().required(),
});

const updateFcmTokenValidation = Joi.object({
  userId: Joi.number(),
  fcmToken: Joi.string().required(),
});

const getNotificationsValidation = Joi.number().required();

export {
  sendNotificationValidation,
  getNotificationsValidation,
  updateFcmTokenValidation,
};
