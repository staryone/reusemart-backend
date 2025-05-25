import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import transaksiController from "../controllers/transaksi.controller.js";

const transaksiRouter = new express.Router();

/**
 * @swagger
 * /api/transaksi:
 *   post:
 *     summary: Register a new transaksi
 *     tags: [Transaksi]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_transaksi
 *               - detail_transaksi
 *             properties:
 *               nama_transaksi:
 *                 type: string
 *                 example: Rumah
 *               detail_transaksi:
 *                 type: string
 *                 example: Jl. kusuma negara
 *     responses:
 *       200:
 *         description: Transaksi registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Create transaksi berhasil!
 *       400:
 *         description: Invalid input or transaksi already exists
 *       401:
 *         description: Unauthorized
 */
transaksiRouter.post(
  "/api/transaksi",
  restrictTo("PEMBELI"),
  transaksiController.create
);

transaksiRouter.get(
  "/api/transaksi/verifLists",
  restrictTo("PEGAWAI", "CS"),
  transaksiController.getListVerifPembayaran
);

transaksiRouter.patch(
  "/api/transaksi/:id/verif",
  restrictTo("PEGAWAI", "CS"),
  transaksiController.verifPembayaran
);

transaksiRouter.get(
  "/api/transaksi/:id",
  restrictTo("PEMBELI"),
  transaksiController.get
);

transaksiRouter.delete(
  "/api/transaksi/:id",
  restrictTo("PEMBELI"),
  transaksiController.updateExpiredPayment
);

transaksiRouter.post(
  "/api/transaksi/:id",
  restrictTo("PEMBELI"),
  transaksiController.uploadPembayaran
);

export { transaksiRouter };
