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
  "/api/penitipan/laporan-komisi",
  restrictTo("PEGAWAI", "GUDANG", "OWNER"),
  penitipanController.getLaporanKomisi
);

penitipanRouter.get(
  "/api/penitipan/laporan-penjualan",
  restrictTo("PEGAWAI", "OWNER"),
  penitipanController.getLaporanPenjualanBulanan
);

penitipanRouter.patch(
  "/api/penitipan/:id",
  restrictTo("PEGAWAI", "GUDANG"),
  penitipanController.update
);

penitipanRouter.patch(
  "/api/penitipan/extend/:id_dtl_penitipan",
  restrictTo("PENITIP"),
  penitipanController.extendPenitipan
);

export { penitipanRouter };
