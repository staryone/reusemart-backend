import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import donasiController from "../controllers/donasi.controller.js";

const donasiRouter = new express.Router();

/**
 * @swagger
 * /api/donasi:
 *   post:
 *     summary: Register a new donasi
 *     tags: [Donasi]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_penerima
 *               - id_barang
 *               - id_request
 *             properties:
 *               nama_penerima:
 *                 type: string
 *                 example: Joko
 *               id_barang:
 *                 type: string
 *                 example: M12
 *               id_request:
 *                 type: integer
 *                 example: 1
 *               tanggal_donasi:
 *                 type: string
 *                 example: 2025-05-07T10:00:00Z
 *     responses:
 *       200:
 *         description: Donasi registered successfully
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
 *                   example: Create donasi berhasil!
 *       400:
 *         description: Invalid input or donasi already exists
 *       401:
 *         description: Unauthorized
 */
donasiRouter.post(
  "/api/donasi",
  restrictTo("PEGAWAI", "OWNER"),
  donasiController.create
);

/**
 * @swagger
 * /api/donasi/lists/{idOrganisasi}:
 *   get:
 *     summary: Get a list of donasi and able to search
 *     tags: [Donasi]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idOrganisasi
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^(ORG|org)\d+$
 *         description: Organization ID (e.g., ORG123)
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
 *         description: Search term for nama_donasi or detail_donasi
 *     responses:
 *       200:
 *         description: List of donasi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Donasi'
 *       401:
 *         description: Unauthorized
 */
donasiRouter.get(
  "/api/donasi/lists/:idOrganisasi",
  restrictTo("PEGAWAI", "OWNER"),
  donasiController.getList
);

/**
 * @swagger
 * /api/donasi/{id}:
 *   get:
 *     summary: Get an donasi by ID
 *     tags: [Donasi]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Donasi ID (e.g., 123)
 *     responses:
 *       200:
 *         description: Donasi details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Donasi'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Donasi not found
 */
donasiRouter.get(
  "/api/donasi/:id",
  restrictTo("PEGAWAI", "OWNER"),
  donasiController.get
);

/**
 * @swagger
 * /api/donasi/{id}:
 *   patch:
 *     summary: Update an donasi
 *     tags: [Donasi]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Donasi ID (e.g., 123)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_penerima:
 *                 type: string
 *                 example: Wahya
 *               tanggal_donasi:
 *                 type: string
 *                 example: 2025-05-07T10:00:00Z
 *     responses:
 *       200:
 *         description: Donasi updated successfully
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
 *                   example: Update donasi berhasil!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Donasi not found
 */
donasiRouter.patch(
  "/api/donasi/:id",
  restrictTo("PEGAWAI", "OWNER"),
  donasiController.update
);

export { donasiRouter };
