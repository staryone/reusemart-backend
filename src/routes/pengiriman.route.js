import express from "express";
import pengirimanController from "../controllers/pengiriman.controller.js";
import { restrictTo } from "../middleware/restrictTo.middleware.js";

const pengirimanRouter = new express.Router();

// pengirimanRouter.post(
//   "/api/pengiriman",
//   restrictTo("PEGAWAI", "CS", "GUDANG"),
//   pengirimanController.create
// );

pengirimanRouter.get(
  "/api/pengiriman/lists",
  restrictTo("PEGAWAI", "GUDANG"),
  pengirimanController.getList
);

// pengirimanRouter.get(
//   "/api/pengiriman/:id",
//   restrictTo("PEGAWAI", "CS", "GUDANG", "PENITIP"),
//   pengirimanController.get
// );

// pengirimanRouter.patch(
//   "/api/pengiriman/:id",
//   restrictTo("PEGAWAI", "CS", "GUDANG"),
//   pengirimanController.update
// );

// pengirimanRouter.delete(
//   "/api/pengiriman/:id",
//   restrictTo("PEGAWAI", "CS", "GUDANG"),
//   pengirimanController.destroy
// );

export { pengirimanRouter };
