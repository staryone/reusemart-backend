import express from "express";
import swaggerUi from "swagger-ui-express";
import { publicRouter } from "../routes/public.route.js";
import { errorMiddleware } from "../middleware/error.middleware.js";
import { pegawaiRouter } from "../routes/pegawai.route.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import swaggerSpec from "./swagger.js";

export const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(publicRouter);
app.use(authMiddleware);
app.use(pegawaiRouter);
app.use(errorMiddleware);
