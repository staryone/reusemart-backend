import express from "express";
import pegawaiController from "../controllers/pegawai.controller.js";
import organisasiController from "../controllers/organisasi.controller.js";
import authController from "../controllers/auth.controller.js";
import penitipController from "../controllers/penitip.controller.js";
import pembeliController from "../controllers/pembeli.controller.js";
import barangController from "../controllers/barang.controller.js";
import diskusiController from "../controllers/diskusi.controller.js";
import notificationController from "../controllers/notifikasi.controller.js";

const publicRouter = new express.Router();

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
 *               - password
 *               - confirm_password
 *               - nama
 *               - nomor_telepon
 *               - tgl_lahir
 *               - id_jabatan
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: organization@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               confirm_password:
 *                 type: string
 *                 example: password123
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
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Register organisasi berhasil!
 *       400:
 *         description: Invalid input or email already exists
 *       401:
 *         description: Unauthorized
 */
publicRouter.post("/api/organisasi", organisasiController.register);

/**
 * @swagger
 * /api/pembeli:
 *   post:
 *     summary: Register a new pembeli
 *     tags: [Pembeli]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirm_password
 *               - nama
 *               - alamat
 *               - nomor_telepon
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: pembelitest@gmail.com
 *               password:
 *                 type: string
 *                 example: test1234
 *               confirm_password:
 *                 type: string
 *                 example: test1234
 *               nama:
 *                 type: string
 *                 example: Joko Waluyo
 *               nomor_telepon:
 *                 type: string
 *                 example: +6281234567890
 *     responses:
 *       200:
 *         description: Pembeli registered successfully
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
 *                   example: Register pembeli berhasil!
 *       400:
 *         description: Invalid input or email already exists
 *       401:
 *         description: Unauthorized
 */
publicRouter.post("/api/pembeli", pembeliController.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in an user
 *     tags: [User]
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
 *                 example: userlogin@gmail.com
 *               password:
 *                 type: string
 *                 example: test1234
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

publicRouter.post("/api/login", authController.login);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in an user
 *     tags: [User]
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
 *                 example: userlogin@gmail.com
 *               password:
 *                 type: string
 *                 example: test1234
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

publicRouter.post("/api/login/mobile", authController.loginMobile);

/**
 * @swagger
 * /api/barang/lists:
 *   get:
 *     summary: Get a list of barang and able to search
 *     tags: [Barang]
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
 *         description: Search term for nama barang or nama penitip or nama kategori
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *            - TERSEDIA
 *            - DIDONASIKAN
 *            - TERJUAL
 *            - KEMBALI
 *            - TERDONASI
 *         description: Search term for status barang
 *     responses:
 *       200:
 *         description: List of barang
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Barang'
 *                 totalItems:
 *                   type: integer
 *                   example: 100
 *       401:
 *         description: Unauthorized
 */
publicRouter.get("/api/barang/lists", barangController.getList);

/**
 * @swagger
 * /api/barang/{id}:
 *   get:
 *     summary: Get an barang by ID
 *     tags: [Barang]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^[A-Za-z]\d+$
 *         description: Barang ID (e.g., M123)
 *     responses:
 *       200:
 *         description: Barang details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Barang'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Barang not found
 */
publicRouter.get("/api/barang/:id", barangController.get);

/**
 * @swagger
 * /api/diskusi/lists/{idBarang}:
 *   get:
 *     summary: Get a list of diskusi and able to search
 *     tags: [Diskusi]
 *     parameters:
 *       - in: path
 *         name: idBarang
 *         required: true
 *         schema:
 *           type: string
 *         description: Barang ID (e.g., A123)
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
publicRouter.get(
  "/api/diskusi/lists/:idBarang",
  diskusiController.getListByIdBarang
);

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Send a forgot password link to user
 *     tags: [User]
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
 *                 example: email@example.com
 *     responses:
 *       200:
 *         description: Successful send email
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
 *                   example: Email reset password berhasil dikirim!
 *       401:
 *         description: Invalid credentials
 */

publicRouter.post("/api/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /api/reset-password/{token}:
 *   post:
 *     summary: Reset password user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token ID (e.g., 437b05af3fe10d69...)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - new_password
 *               - confirm_new_password
 *             properties:
 *               new_password:
 *                 type: string
 *                 example: newPassword123
 *               confirm_new_password:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Successful reset password
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
 *                   example: Reset password berhasil!
 *       401:
 *         description: Invalid credentials
 */

publicRouter.post("/api/reset-password/:token", authController.resetPassword);

/**
 * @swagger
 * /api/reset-password/{token}:
 *   get:
 *     summary: Get an barang by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token ID (e.g., 437b05af3fe10d69...)
 *     responses:
 *       200:
 *         description: Check valid token
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
 *                   example: Token valid!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: token not found
 */

publicRouter.get("/api/reset-password/:token", authController.checkValidToken);

publicRouter.post(
  "/api/notifications/send",
  notificationController.sendNotification
);

export { publicRouter };
