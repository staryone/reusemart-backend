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
import { pembeliRouter } from "../routes/pembeli.route.js";
import { alamatRouter } from "../routes/alamat.route.js";
import cors from "cors";
import { diskusiRouter } from "../routes/diskusi.route.js";
import { requestDonasiRouter } from "../routes/request_donasi.route.js";
import { donasiRouter } from "../routes/donasi.route.js";
import { authRouter } from "../routes/auth.route.js";
import { keranjangRouter } from "../routes/keranjang.route.js";
import { penitipanRouter } from "../routes/penitipan.route.js";
import { redeemMerchRouter } from "../routes/redeem_merch.route.js";

export const app = express();
const PASSWORD_SWAGGER = process.env.PASSWORD_SWAGGER;

app.use(cors());
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
app.use(authRouter);
app.use(pegawaiRouter);
app.use(jabatanRouter);
app.use(organisasiRouter);
app.use(penitipRouter);
app.use(pembeliRouter);
app.use(alamatRouter);
app.use(diskusiRouter);
app.use(requestDonasiRouter);
app.use(donasiRouter);
app.use(keranjangRouter);
app.use(penitipanRouter);
app.use(redeemMerchRouter);
app.use(errorMiddleware);
