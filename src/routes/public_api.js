import express from "express";
import pegawaiController from "../controllers/pegawai.controller.js";

const publicRouter = new express.Router();

publicRouter.post("/api/pegawai", pegawaiController.register);
publicRouter.post("/api/pegawai/login", pegawaiController.login);

export { publicRouter };
