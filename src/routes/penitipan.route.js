import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import penitipanController from "../controllers/penitipan.controller.js";

const penitipanRouter = new express.Router();

penitipanRouter.post(
  "/api/penitipan",
  restrictTo("PEGAWAI", "GUDANG"),
  penitipanController.create
);

penitipanRouter.get(
  "/api/penitipan/lists",
  restrictTo("PEGAWAI", "GUDANG", "OWNER"),
  penitipanController.getList
);

penitipanRouter.get(
  "/api/penitipan/laporan",
  restrictTo("PEGAWAI", "OWNER"),
  penitipanController.getLaporan
);

penitipanRouter.patch(
  "/api/penitipan/:id",
  restrictTo("PEGAWAI", "GUDANG"),
  penitipanController.update
);

export { penitipanRouter };