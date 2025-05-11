import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import requestDonasiController from "../controllers/request_donasi.controller.js";

const requestDonasiRouter = new express.Router();

/**
 * @swagger
 * /api/request-donasi:
 *   post:
 *     summary: Register a new request donasi
 *     tags: [RequestDonasi]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deskripsi
 *             properties:
 *               deskripsi:
 *                 type: string
 *                 example: Kipas Angin Portable
 *     responses:
 *       200:
 *         description: RequestDonasi registered successfully
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
 *                   example: Create request donasi berhasil!
 *       400:
 *         description: Invalid input or request donasi already exists
 *       401:
 *         description: Unauthorized
 */
requestDonasiRouter.post(
  "/api/request-donasi",
  restrictTo("ORGANISASI"),
  requestDonasiController.create
);

/**
 * @swagger
 * /api/request-donasi/lists:
 *   get:
 *     summary: Get a list of request donasi and able to search
 *     tags: [RequestDonasi]
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
 *         description: Search term for deskripsi
 *     responses:
 *       200:
 *         description: List of request donasi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RequestDonasi'
 *       401:
 *         description: Unauthorized
 */
requestDonasiRouter.get(
  "/api/request-donasi/lists",
  restrictTo("ORGANISASI"),
  requestDonasiController.getList
);

/**
 * @swagger
 * /api/request-donasi/allLists:
 *   get:
 *     summary: Get a list of request donasi and able to search
 *     tags: [RequestDonasi]
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
 *         description: Search term for deskripsi and status
 *       - in: query
 *         name: searchOrg
 *         schema:
 *           type: string
 *         description: Search term for organisasi
 *     responses:
 *       200:
 *         description: All List of request donasi (Owner Only)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RequestDonasi'
 *       401:
 *         description: Unauthorized
 */
requestDonasiRouter.get(
  "/api/request-donasi/allLists",
  restrictTo("PEGAWAI", "OWNER"),
  requestDonasiController.getAllList
);

/**
 * @swagger
 * /api/request-donasi/{id}:
 *   get:
 *     summary: Get an request donasi by ID
 *     tags: [RequestDonasi]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: RequestDonasi ID (e.g., 123)
 *     responses:
 *       200:
 *         description: RequestDonasi details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/RequestDonasi'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: RequestDonasi not found
 */
requestDonasiRouter.get(
  "/api/request-donasi/:id",
  restrictTo("ORGANISASI"),
  requestDonasiController.get
);

/**
 * @swagger
 * /api/request-donasi/{id}:
 *   patch:
 *     summary: Update an request donasi
 *     tags: [RequestDonasi]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: RequestDonasi ID (e.g., 123)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deskripsi:
 *                 type: string
 *                 example: Tudung Saji
 *     responses:
 *       200:
 *         description: RequestDonasi updated successfully
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
 *                   example: Update request donasi berhasil!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: RequestDonasi not found
 */
requestDonasiRouter.patch(
  "/api/request-donasi/:id",
  restrictTo("ORGANISASI"),
  requestDonasiController.update
);

/**
 * @swagger
 * /api/request-donasi/{id}:
 *   delete:
 *     summary: Delete an request donasi
 *     tags: [RequestDonasi]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: RequestDonasi ID (e.g., 123)
 *     responses:
 *       200:
 *         description: RequestDonasi deleted successfully
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
 *                   example: Hapus request donasi berhasil!
 *       400:
 *         description: Invalid input or nama request donasi already exists
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: RequestDonasi not found
 */
requestDonasiRouter.delete(
  "/api/request-donasi/:id",
  restrictTo("ORGANISASI"),
  requestDonasiController.destroy
);

export { requestDonasiRouter };
