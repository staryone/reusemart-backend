import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import keranjangController from "../controllers/keranjang.controller.js";

const keranjangRouter = new express.Router();

/**
 * @swagger
 * /api/keranjang:
 *   post:
 *     summary: Register a new keranjang
 *     tags: [Keranjang]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_barang
 *             properties:
 *               id_barang:
 *                 type: string
 *                 example: M123
 *     responses:
 *       200:
 *         description: Keranjang registered successfully
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
 *                   example: Create keranjang berhasil!
 *       400:
 *         description: Invalid input or keranjang already exists
 *       401:
 *         description: Unauthorized
 */
keranjangRouter.post(
  "/api/keranjang",
  restrictTo("PEMBELI"),
  keranjangController.create
);

/**
 * @swagger
 * /api/keranjang/lists:
 *   get:
 *     summary: Get a list of keranjang and able to search
 *     tags: [Keranjang]
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
 *     responses:
 *       200:
 *         description: List of keranjang
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Keranjang'
 *       401:
 *         description: Unauthorized
 */
keranjangRouter.get(
  "/api/keranjang/lists",
  restrictTo("PEMBELI"),
  keranjangController.getList
);

/**
 * @swagger
 * /api/keranjang/{id}:
 *   delete:
 *     summary: Delete an keranjang
 *     tags: [Keranjang]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Keranjang ID (e.g., 123)
 *     responses:
 *       200:
 *         description: Keranjang deleted successfully
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
 *                   example: Hapus keranjang berhasil!
 *       400:
 *         description: Invalid input or nama keranjang already exists
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Keranjang not found
 */
keranjangRouter.delete(
  "/api/keranjang/:id",
  restrictTo("PEMBELI"),
  keranjangController.destroy
);

export { keranjangRouter };
