import express from "express";
import pengirimanController from "../controllers/pengiriman.controller.js";
import { restrictTo } from "../middleware/restrictTo.middleware.js";

const pengirimanRouter = new express.Router();

/**
 * @swagger
 * /api/pengiriman:
 *   post:
 *     summary: Create a new pengiriman
 *     tags: [Pengiriman]
 *     security:
 *       - BearerAuth: []
 xrange: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tanggal
 *               - status_pengiriman
 *               - id_kurir
 *               - id_transaksi
 *             properties:
 *               tanggal:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-31T14:36:00.000Z"
 *               status_pengiriman:
 *                 type: string
 *                 enum: [DIPROSES, SIAP_DIAMBIL, SEDANG_DIKIRIM]
 *                 example: DIPROSES
 *               id_kurir:
 *                 type: integer
 *                 example: 1
 *               id_transaksi:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pengiriman created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Pengiriman'
 *                 message:
 *                   type: string
 *                   example: Pengiriman berhasil dibuat!
 *       401:
 *         description: Unauthorized
 */
pengirimanRouter.post(
  "/api/pengiriman",
  restrictTo("PEGAWAI", "CS", "GUDANG"),
  pengirimanController.create
);

/**
 * @swagger
 * /api/pengiriman/{id}:
 *   get:
 *     summary: Get a pengiriman by ID
 *     tags: [Pengiriman]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pengiriman ID
 *     responses:
 *       200:
 *         description: Pengiriman details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Pengiriman'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pengiriman not found
 */
pengirimanRouter.get(
  "/api/pengiriman/:id",
  restrictTo("PEGAWAI", "CS", "GUDANG", "PENITIP"),
  pengirimanController.get
);

/**
 * @swagger
 * /api/pengiriman/lists:
 *   get:
 *     summary: Get a list of pengiriman with pagination and search
 *     tags: [Pengiriman]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for status_pengiriman, id_kurir, or id_transaksi
 *     responses:
 *       200:
 *         description: List of pengiriman
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pengiriman'
 *                 totalItems:
 *                   type: integer
 *                   example: 50
 *       401:
 *         description: Unauthorized
 */
pengirimanRouter.get(
  "/api/pengiriman/lists",
  restrictTo("PEGAWAI", "CS", "GUDANG", "PENITIP"),
  pengirimanController.getList
);

/**
 * @swagger
 * /api/pengiriman/{id}:
 *   patch:
 *     summary: Update a pengiriman
 *     tags: [Pengiriman]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pengiriman ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tanggal:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-31T14:36:00.000Z"
 *               status_pengiriman:
 *                 type: string
 *                 enum: [DIPROSES, SIAP_DIAMBIL, SEDANG_DIKIRIM]
 *                 example: SEDANG_DIKIRIM
 *               id_kurir:
 *                 type: integer
 *                 example: 1
 *               id_transaksi:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pengiriman updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Pengiriman'
 *                 message:
 *                   type: string
 *                   example: Pengiriman berhasil diperbarui!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pengiriman not found
 */
pengirimanRouter.patch(
  "/api/pengiriman/:id",
  restrictTo("PEGAWAI", "CS", "GUDANG"),
  pengirimanController.update
);

/**
 * @swagger
 * /api/pengiriman/{id}:
 *   delete:
 *     summary: Delete a pengiriman
 *     tags: [Pengiriman]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pengiriman ID
 *     responses:
 *       200:
 *         description: Pengiriman deleted successfully
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
 *                   example: Pengiriman berhasil dihapus!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pengiriman not found
 */
pengirimanRouter.delete(
  "/api/pengiriman/:id",
  restrictTo("PEGAWAI", "CS", "GUDANG"),
  pengirimanController.destroy
);

export { pengirimanRouter };
