import express from "express";
import pegawaiController from "../controllers/pegawai.controller.js";
import organisasiController from "../controllers/organisasi.controller.js";

const publicRouter = new express.Router();

/**
 * @swagger
 * /api/pegawai/login:
 *   post:
 *     summary: Log in an employee
 *     tags: [Pegawai]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: employee@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 */

publicRouter.post("/api/pegawai/login", pegawaiController.login);

/**
 * @swagger
 * /api/organisasi:
 *   post:
 *     summary: Register a new organization
 *     tags: [Organisasi]
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
 *               password:
 *                 type: string
 *                 example: newPassword123
 *               confirm_password:
 *                 type: string
 *                 example: newPassword123
 *               nama_organisasi:
 *                 type: string
 *                 example: John Doe
 *               alamat:
 *                 type: string
 *                 example: Jl Kecambang no 2
 *               nomor_telepon:
 *                 type: string
 *                 example: 02746642721
 *               deskripsi:
 *                 type: string
 *                 example: Organisasi bantuan kondang
 *     responses:
 *       200:
 *         description: Organization registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Organisasi'
 *       400:
 *         description: Invalid input or email already exists
 *       401:
 *         description: Unauthorized
 */
publicRouter.post("/api/organisasi", organisasiController.register);

/**
 * @swagger
 * /api/organisasi/login:
 *   post:
 *     summary: Log in an organization
 *     tags: [Organisasi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: organization@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 */

publicRouter.post("/api/organisasi/login", organisasiController.login);

/**
 * @swagger
 * /api/organisasi/forgot-password:
 *   post:
 *     summary: Send a forgot password link to organization
 *     tags: [Organisasi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: organization@example.com
 *     responses:
 *       200:
 *         description: Successful send email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: Email sent to gmail.com
 *       401:
 *         description: Invalid credentials
 */

publicRouter.post(
  "/api/organisasi/forgot-password",
  organisasiController.forgotPassword
);

export { publicRouter };
