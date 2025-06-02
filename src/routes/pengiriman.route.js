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
  "/api/pengiriman/lists-dikirim",
  restrictTo("PEGAWAI", "GUDANG"),
  pengirimanController.getListDikirim
);

pengirimanRouter.get(
  "/api/pengiriman/lists-diambil",
  restrictTo("PEGAWAI", "GUDANG"),
  pengirimanController.getListDiambil
);

pengirimanRouter.post(
  "/api/pengiriman/atur-pengiriman",
  restrictTo("PEGAWAI", "GUDANG"),
  pengirimanController.aturPengiriman
);

pengirimanRouter.post(
  "/api/pengiriman/atur-pengambilan",
  restrictTo("PEGAWAI", "GUDANG"),
  pengirimanController.aturPengambilan
);

pengirimanRouter.post(
  "/api/pengiriman/konfirmasi-pengambilan",
  restrictTo("PEGAWAI", "GUDANG"),
  pengirimanController.konfirmasiPengambilan
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
