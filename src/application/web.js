import express from "express";
import { publicRouter } from "../routes/public_api.js";
import { errorMiddleware } from "../middleware/error.middleware.js";
import { pegawaiRouter } from "../routes/api.js";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(pegawaiRouter);
web.use(errorMiddleware);
