import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import diskusiController from "../controllers/diskusi.controller.js";

const diskusiRouter = new express.Router();

/**
 * @swagger
 * /api/diskusi:
 *   post:
 *     summary: Register a new diskusi
 *     tags: [Diskusi]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pesan
 *               - id_barang
 *             properties:
 *               pesan:
 *                 type: string
 *                 example: Wah rumahnya bagus sekali
 *               id_barang:
 *                 type: string
 *                 example: M1
 *     responses:
 *       200:
 *         description: Diskusi create successfully
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
 *                   example: Create diskusi berhasil!
 *       400:
 *         description: Invalid input or diskusi already exists
 *       401:
 *         description: Unauthorized
 */
diskusiRouter.post(
  "/api/diskusi",
  restrictTo("PEGAWAI", "CS", "PEMBELI"),
  diskusiController.create
);

/**
 * @swagger
 * /api/diskusi/lists:
 *   get:
 *     summary: Get a list of diskusi and able to search
 *     tags: [Diskusi]
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
 *         description: Search term for nama barang
 *     responses:
 *       200:
 *         description: List of diskusi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Diskusi'
 *                 totalItems:
 *                   type: integer
 *                   example: 100
 *       401:
 *         description: Unauthorized
 */
diskusiRouter.get(
  "/api/diskusi/lists",
  restrictTo("PEGAWAI", "CS"),
  diskusiController.getList
);

/**
 * @swagger
 * /api/diskusi/{id}:
 *   get:
 *     summary: Get an diskusi by ID
 *     tags: [Diskusi]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Diskusi ID (e.g., 123)
 *     responses:
 *       200:
 *         description: Diskusi details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Diskusi'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Diskusi not found
 */
diskusiRouter.get(
  "/api/diskusi/:id",
  restrictTo("PEGAWAI", "CS", "PEMBELI"),
  diskusiController.get
);

export { diskusiRouter };
