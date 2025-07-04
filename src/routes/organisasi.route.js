import express from "express";
import organisasiController from "../controllers/organisasi.controller.js";
import { restrictTo } from "../middleware/restrictTo.middleware.js";

const organisasiRouter = new express.Router();

/**
 * @swagger
 * /api/organisasi/current:
 *   get:
 *     summary: Get current organization profile
 *     tags: [Organisasi]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Organization profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Organisasi'
 *       401:
 *         description: Unauthorized
 */
organisasiRouter.get(
  "/api/organisasi/current",
  restrictTo("ORGANISASI"),
  organisasiController.profile
);

/**
 * @swagger
 * /api/organisasi/lists:
 *   get:
 *     summary: Get a list of organizations and able to search
 *     tags: [Organisasi]
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
 *         description: Search term for organization name, email, or position
 *     responses:
 *       200:
 *         description: List of organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Organisasi'
 *                 totalItems:
 *                   type: integer
 *                   example: 100
 *       401:
 *         description: Unauthorized
 */
organisasiRouter.get(
  "/api/organisasi/lists",
  restrictTo("PEGAWAI", "ADMIN"),
  organisasiController.getList
);

/**
 * @swagger
 * /api/organisasi/{id}:
 *   get:
 *     summary: Get an organization by ID
 *     tags: [Organisasi]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^(ORG|org)\d+$
 *         description: Organization ID (e.g., ORG123)
 *     responses:
 *       200:
 *         description: Organization details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Organisasi'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Organization not found
 */
organisasiRouter.get(
  "/api/organisasi/:id",
  restrictTo("PEGAWAI", "ADMIN", 'OWNER'),
  organisasiController.get
);

/**
 * @swagger
 * /api/organisasi/{id}:
 *   patch:
 *     summary: Update an organization
 *     tags: [Organisasi]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^(ORG|org)\d+$
 *         description: Organization ID (e.g., ORG123)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: organization@example.com
 *               nama_organisasi:
 *                 type: string
 *                 example: Komunitas Peduli Kundang
 *               alamat:
 *                 type: string
 *                 example: Jl. Kecambang no 2
 *               nomor_telepon:
 *                 type: string
 *                 example: 02746642721
 *               deskripsi:
 *                 type: string
 *                 example: Organisasi bantuan dan kondang
 *     responses:
 *       200:
 *         description: Organization updated successfully
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
 *                   example: Update organisasi berhasil!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Organization not found
 */
organisasiRouter.patch(
  "/api/organisasi/:id",
  restrictTo("PEGAWAI", "ADMIN"),
  organisasiController.update
);

/**
 * @swagger
 * /api/organisasi/{id}:
 *   delete:
 *     summary: Delete an organization
 *     tags: [Organisasi]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^(ORG|org)\d+$
 *         description: Organization ID (e.g., ORG123)
 *     responses:
 *       200:
 *         description: Organization deleted successfully
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
 *                   example: Hapus organisasi berhasil!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Organization not found
 */
organisasiRouter.delete(
  "/api/organisasi/:id",
  restrictTo("PEGAWAI", "ADMIN"),
  organisasiController.destroy
);

export { organisasiRouter };
