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
 * /api/organisasi/logout:
 *   delete:
 *     summary: Log out the current organization
 *     tags: [Organisasi]
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
organisasiRouter.delete(
  "/api/organisasi/logout",
  restrictTo("ORGANISASI"),
  organisasiController.logout
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
 *       401:
 *         description: Unauthorized
 */
organisasiRouter.get(
  "/api/organisasi/lists",
  restrictTo("ORGANISASI"),
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
  restrictTo("ORGANISASI"),
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
 *                   $ref: '#/components/schemas/Organisasi'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Organization not found
 */
organisasiRouter.patch(
  "/api/organisasi/:id",
  restrictTo("ORGANISASI"),
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
 *                   example: Hapus organisasi berhasil!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Organization not found
 */
organisasiRouter.delete(
  "/api/organisasi/:id",
  restrictTo("ORGANISASI"),
  organisasiController.destroy
);

export { organisasiRouter };
