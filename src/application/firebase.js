import admin from "firebase-admin";
import "dotenv/config";

const serviceAccount = (
  await import(process.env.FIREBASE_CREDENTIALS_PATH, {
    assert: { type: "json" },
  })
).default;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushNotification = async (
  fcmToken,
  title,
  body,
  data = {}
) => {
  try {
    const message = {
      token: fcmToken,
      notification: {
        title: title,
        body: body,
      },
      data: data,
    };

    const response = await admin.messaging().send(message);
    console.log("Successfully sent notification:", response);
    return response;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};
