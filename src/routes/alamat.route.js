import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import alamatController from "../controllers/alamat.controller.js";

const alamatRouter = new express.Router();

/**
 * @swagger
 * /api/alamat:
 *   post:
 *     summary: Register a new alamat
 *     tags: [Alamat]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_alamat
 *               - detail_alamat
 *             properties:
 *               nama_alamat:
 *                 type: string
 *                 example: Rumah
 *               detail_alamat:
 *                 type: string
 *                 example: Jl. kusuma negara
 *     responses:
 *       200:
 *         description: Alamat registered successfully
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
 *                   example: Create alamat berhasil!
 *       400:
 *         description: Invalid input or alamat already exists
 *       401:
 *         description: Unauthorized
 */
alamatRouter.post(
  "/api/alamat",
  restrictTo("PEMBELI"),
  alamatController.create
);

/**
 * @swagger
 * /api/alamat/lists:
 *   get:
 *     summary: Get a list of alamat and able to search
 *     tags: [Alamat]
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
 *         description: Search term for nama_alamat or detail_alamat
 *     responses:
 *       200:
 *         description: List of alamat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Alamat'
 *       401:
 *         description: Unauthorized
 */
alamatRouter.get(
  "/api/alamat/lists",
  restrictTo("PEMBELI"),
  alamatController.getList
);

/**
 * @swagger
 * /api/alamat/{id}:
 *   get:
 *     summary: Get an alamat by ID
 *     tags: [Alamat]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Alamat ID (e.g., 123)
 *     responses:
 *       200:
 *         description: Alamat details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Alamat'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Alamat not found
 */
alamatRouter.get(
  "/api/alamat/:id",
  restrictTo("PEMBELI"),
  alamatController.get
);

/**
 * @swagger
 * /api/alamat/{id}:
 *   patch:
 *     summary: Update an alamat
 *     tags: [Alamat]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Alamat ID (e.g., 123)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_alamat:
 *                 type: integer
 *                 example: 2
 *               nama_alamat:
 *                 type: string
 *               detail_alamat:
 *                 type: string
 *               status_default:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Alamat updated successfully
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
 *                   example: Update alamat berhasil!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Alamat not found
 */
alamatRouter.patch(
  "/api/alamat/:id",
  restrictTo("PEMBELI"),
  alamatController.update
);

/**
 * @swagger
 * /api/alamat/{id}:
 *   delete:
 *     summary: Delete an alamat
 *     tags: [Alamat]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Alamat ID (e.g., 123)
 *     responses:
 *       200:
 *         description: Alamat deleted successfully
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
 *                   example: Hapus alamat berhasil!
 *       400:
 *         description: Invalid input or nama alamat already exists
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Alamat not found
 */
alamatRouter.delete(
  "/api/alamat/:id",
  restrictTo("PEMBELI"),
  alamatController.destroy
);

export { alamatRouter };
