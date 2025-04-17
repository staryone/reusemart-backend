import express from "express";
import pegawaiController from "../controllers/pegawai.controller.js";
import { restrictTo } from "../middleware/restrictTo.middleware.js";

const pegawaiRouter = new express.Router();

/**
 * @swagger
 * /api/pegawai:
 *   post:
 *     summary: Register a new employee
 *     tags: [Pegawai]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - nama
 *               - nomor_telepon
 *               - tgl_lahir
 *               - id_jabatan
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: newemployee@example.com
 *               nama:
 *                 type: string
 *                 example: John Doe
 *               nomor_telepon:
 *                 type: string
 *                 example: +6281234567890
 *               tgl_lahir:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               id_jabatan:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Employee registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Pegawai'
 *       400:
 *         description: Invalid input or email already exists
 *       401:
 *         description: Unauthorized
 */
pegawaiRouter.post(
  "/api/pegawai",
  restrictTo("PEGAWAI", "ADMIN"),
  pegawaiController.register
);

/**
 * @swagger
 * /api/pegawai/current:
 *   get:
 *     summary: Get current employee profile
 *     tags: [Pegawai]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Employee profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Pegawai'
 *       401:
 *         description: Unauthorized
 */
pegawaiRouter.get(
  "/api/pegawai/current",
  restrictTo("PEGAWAI"),
  pegawaiController.profile
);

/**
 * @swagger
 * /api/pegawai/logout:
 *   delete:
 *     summary: Log out the current employee
 *     tags: [Pegawai]
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
pegawaiRouter.delete(
  "/api/pegawai/logout",
  restrictTo("PEGAWAI"),
  pegawaiController.logout
);

/**
 * @swagger
 * /api/pegawai/change-password:
 *   patch:
 *     summary: Change the employee's password
 *     tags: [Pegawai]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: Ubah password berhasil!
 *       401:
 *         description: Unauthorized
 */
pegawaiRouter.patch(
  "/api/pegawai/change-password",
  restrictTo("PEGAWAI"),
  pegawaiController.changePassword
);

/**
 * @swagger
 * /api/pegawai/lists:
 *   get:
 *     summary: Get a list of employees and able to search
 *     tags: [Pegawai]
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
 *         description: Search term for employee name, email, or position
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pegawai'
 *       401:
 *         description: Unauthorized
 */
pegawaiRouter.get(
  "/api/pegawai/lists",
  restrictTo("PEGAWAI", "ADMIN"),
  pegawaiController.getList
);

/**
 * @swagger
 * /api/pegawai/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Pegawai]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^[Pp]\d+$
 *         description: Employee ID (e.g., P123)
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Pegawai'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
pegawaiRouter.get(
  "/api/pegawai/:id",
  restrictTo("PEGAWAI", "ADMIN"),
  pegawaiController.get
);

/**
 * @swagger
 * /api/pegawai/{id}:
 *   patch:
 *     summary: Update an employee
 *     tags: [Pegawai]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^[Pp]\d+$
 *         description: Employee ID (e.g., P123)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 example: Jane Doe
 *               nomor_telepon:
 *                 type: string
 *                 example: +6289876543210
 *               komisi:
 *                 type: number
 *                 example: 0
 *               tgl_lahir:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               id_jabatan:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Pegawai'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
pegawaiRouter.patch(
  "/api/pegawai/:id",
  restrictTo("PEGAWAI", "ADMIN"),
  pegawaiController.update
);

/**
 * @swagger
 * /api/pegawai/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Pegawai]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^[Pp]\d+$
 *         description: Employee ID (e.g., P123)
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: Hapus pegawai berhasil!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
pegawaiRouter.delete(
  "/api/pegawai/:id",
  restrictTo("PEGAWAI", "ADMIN"),
  pegawaiController.destroy
);

/**
 * @swagger
 * /api/pegawai/{id}/reset-password:
 *   patch:
 *     summary: Reset an employee's password
 *     tags: [Pegawai]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^[Pp]\d+$
 *         description: Employee ID (e.g., P123)
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: Reset password berhasil!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
pegawaiRouter.patch(
  "/api/pegawai/:id/reset-password",
  restrictTo("PEGAWAI", "ADMIN"),
  pegawaiController.resetPassword
);

export { pegawaiRouter };
