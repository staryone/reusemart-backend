import express from "express";
import swaggerUi from "swagger-ui-express";
import expressBasicAuth from "express-basic-auth";
import { publicRouter } from "../routes/public.route.js";
import { errorMiddleware } from "../middleware/error.middleware.js";
import { pegawaiRouter } from "../routes/pegawai.route.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import swaggerSpec from "./swagger.js";
import { jabatanRouter } from "../routes/jabatan.route.js";
import { organisasiRouter } from "../routes/organisasi.route.js";
import { penitipRouter } from "../routes/penitip.route.js";
import "dotenv/config";
import { uploadMulter } from "./multer.js";

export const app = express();
const PASSWORD_SWAGGER = process.env.PASSWORD_SWAGGER;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploadMulter.any());

app.use(
  "/api-docs",
  expressBasicAuth({
    users: { admin: PASSWORD_SWAGGER },
    challenge: true,
    realm: "Swagger UI",
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(publicRouter);

app.use(authMiddleware);
app.use(pegawaiRouter);
app.use(jabatanRouter);
app.use(organisasiRouter);
app.use(penitipRouter);
app.use(errorMiddleware);
