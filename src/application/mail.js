import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { ResponseError } from "../errors/response.error.js";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SMTP_SERVICE_NAME,
  port: process.env.EMAIL_SMTP_PORT,
  secure: process.env.EMAIL_SMTP_SECURE,
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASS,
  },
});

export const sendMail = async ({ from, to, subject, html }) => {
  try {
    const result = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    return result;
  } catch (e) {
    throw new ResponseError(400, e);
  }
};

export const renderMailHtml = async (template, data) => {
  const content = await ejs.renderFile(
    path.join(__dirname, "..", "templates", template),
    data
  );

  return content;
};
