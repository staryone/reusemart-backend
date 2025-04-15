import express from "express";
import { authPegawaiMiddleware } from "../middleware/auth.middleware.js";
import pegawaiController from "../controllers/pegawai.controller.js";

const pegawaiRouter = new express.Router();

pegawaiRouter.use(authPegawaiMiddleware);
pegawaiRouter.get("/api/pegawai/current", pegawaiController.get);
pegawaiRouter.delete("/api/pegawai/logout", pegawaiController.logout);

export { pegawaiRouter };
