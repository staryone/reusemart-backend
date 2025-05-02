import express from "express";
import penitipController from "../controllers/penitip.controller.js";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import { uploadMulter } from "../application/multer.js";

const penitipRouter = new express.Router();

/**
 * @swagger
 * /api/penitip:
 *   post:
 *     summary: Register a new penitip
 *     tags: [Penitip]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirm_password
 *               - nomor_ktp
 *               - foto_ktp
 *               - nama
 *               - alamat
 *               - nomor_telepon
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: penitiptest@gmail.com
 *               password:
 *                 type: string
 *                 example: test1234
 *               confirm_password:
 *                 type: string
 *                 example: test1234
 *               nomor_ktp:
 *                 type: string
 *                 example: 34021711181911
 *               foto_ktp:
 *                 type: string
 *                 format: binary
 *               nama:
 *                 type: string
 *                 example: Joko Waluyo
 *               nomor_telepon:
 *                 type: string
 *                 example: +6281234567890
 *     responses:
 *       200:
 *         description: Penitip registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Penitip'
 *       400:
 *         description: Invalid input or email already exists
 *       401:
 *         description: Unauthorized
 */
penitipRouter.post(
  "/api/penitip",
  restrictTo("PEGAWAI", "CS"),
  penitipController.register
);

/**
 * @swagger
 * /api/penitip/current:
 *   get:
 *     summary: Get current penitip profile
 *     tags: [Penitip]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Penitip profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Penitip'
 *       401:
 *         description: Unauthorized
 */
penitipRouter.get(
  "/api/penitip/current",
  restrictTo("PENITIP"),
  penitipController.profile
);

/**
 * @swagger
 * /api/penitip/logout:
 *   delete:
 *     summary: Log out the current penitip
 *     tags: [Penitip]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: Logout berhasil!
 *       401:
 *         description: Unauthorized
 */
penitipRouter.delete(
  "/api/penitip/logout",
  restrictTo("PENITIP"),
  penitipController.logout
);

/**
 * @swagger
 * /api/penitip/lists:
 *   get:
 *     summary: Get a list of penitips and able to search
 *     tags: [Penitip]
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
 *         description: Search term for penitip name, user, or nomor_ktp
 *     responses:
 *       200:
 *         description: List of penitips
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Penitip'
 *       401:
 *         description: Unauthorized
 */
penitipRouter.get(
  "/api/penitip/lists",
  restrictTo("PEGAWAI", "CS"),
  penitipController.getList
);

/**
 * @swagger
 * /api/penitip/{id}:
 *   get:
 *     summary: Get an penitip by ID
 *     tags: [Penitip]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^[Tt]\d+$
 *         description: Penitip ID (e.g., T123)
 *     responses:
 *       200:
 *         description: Penitip details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Penitip'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Penitip not found
 */
penitipRouter.get(
  "/api/penitip/:id",
  restrictTo("PEGAWAI", "CS"),
  penitipController.get
);

/**
 * @swagger
 * /api/penitip/{id}:
 *   patch:
 *     summary: Update an penitip
 *     tags: [Penitip]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^[Tt]\d+$
 *         description: Penitip ID (e.g., T123)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: penitiptest@gmail.com
 *               nomor_ktp:
 *                 type: string
 *                 example: 34021711181911
 *               foto_ktp:
 *                 type: string
 *                 format: binary
 *               nama:
 *                 type: string
 *                 example: Joko Waluyo
 *               nomor_telepon:
 *                 type: string
 *                 example: +6281234567890
 *     responses:
 *       200:
 *         description: Penitip updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Penitip'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Penitip not found
 */
penitipRouter.patch(
  "/api/penitip/:id",
  restrictTo("PEGAWAI", "CS"),
  penitipController.update
);

/**
 * @swagger
 * /api/penitip/{id}:
 *   delete:
 *     summary: Delete an penitip
 *     tags: [Penitip]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^[Tt]\d+$
 *         description: Penitip ID (e.g., T123)
 *     responses:
 *       200:
 *         description: Penitip deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: Hapus penitip berhasil!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Penitip not found
 */
penitipRouter.delete(
  "/api/penitip/:id",
  restrictTo("PEGAWAI", "CS"),
  penitipController.destroy
);

export { penitipRouter };
