import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import jabatanController from "../controllers/jabatan.controller.js";

const jabatanRouter = new express.Router();

/**
 * @swagger
 * /api/jabatan:
 *   post:
 *     summary: Register a new jabatan
 *     tags: [Jabatan]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_jabatan
 *             properties:
 *               nama:
 *                 type: string
 *                 example: Manager
 *     responses:
 *       200:
 *         description: Jabatan registered successfully
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
 *                   example: Create jabatan berhasil!
 *       400:
 *         description: Invalid input or jabatan already exists
 *       401:
 *         description: Unauthorized
 */
jabatanRouter.post(
  "/api/jabatan",
  restrictTo("PEGAWAI", "ADMIN"),
  jabatanController.create
);

/**
 * @swagger
 * /api/jabatan/lists:
 *   get:
 *     summary: Get a list of jabatan and able to search
 *     tags: [Jabatan]
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
 *         description: Search term for position
 *     responses:
 *       200:
 *         description: List of jabatan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Jabatan'
 *       401:
 *         description: Unauthorized
 */
jabatanRouter.get(
  "/api/jabatan/lists",
  restrictTo("PEGAWAI", "ADMIN"),
  jabatanController.getList
);

/**
 * @swagger
 * /api/jabatan/{id}:
 *   get:
 *     summary: Get an jabatan by ID
 *     tags: [Jabatan]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Jabatan ID (e.g., 123)
 *     responses:
 *       200:
 *         description: Jabatan details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Jabatan'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Jabatan not found
 */
jabatanRouter.get(
  "/api/jabatan/:id",
  restrictTo("PEGAWAI", "ADMIN"),
  jabatanController.get
);

/**
 * @swagger
 * /api/jabatan/{id}:
 *   patch:
 *     summary: Update an jabatan
 *     tags: [Jabatan]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Jabatan ID (e.g., 123)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_jabatan:
 *                 type: integer
 *                 example: 2
 *               nama_jabatan:
 *                 type: string
 *                 example: Manager
 *     responses:
 *       200:
 *         description: Jabatan updated successfully
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
 *                   example: Update jabatan berhasil!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Jabatan not found
 */
jabatanRouter.patch(
  "/api/jabatan/:id",
  restrictTo("PEGAWAI", "ADMIN"),
  jabatanController.update
);

/**
 * @swagger
 * /api/jabatan/{id}:
 *   delete:
 *     summary: Delete an jabatan
 *     tags: [Jabatan]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Jabatan ID (e.g., 123)
 *     responses:
 *       200:
 *         description: Jabatan deleted successfully
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
 *                   example: Hapus jabatan berhasil!
 *       400:
 *         description: Invalid input or nama jabatan already exists
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Jabatan not found
 */
jabatanRouter.delete(
  "/api/jabatan/:id",
  restrictTo("PEGAWAI", "ADMIN"),
  jabatanController.destroy
);

export { jabatanRouter };
