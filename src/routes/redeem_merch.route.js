import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import redeemMerchController from "../controllers/redeem_merch.controller.js";

const redeemMerchRouter = new express.Router();

/**
 * @swagger
 * /api/redeem-merch:
 *   post:
 *     summary: Register a new redeem-merch
 *     tags: [RedeemMerch]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_redeem-merch
 *               - detail_redeem-merch
 *             properties:
 *               nama_redeem-merch:
 *                 type: string
 *                 example: Rumah
 *               detail_redeem-merch:
 *                 type: string
 *                 example: Jl. kusuma negara
 *     responses:
 *       200:
 *         description: RedeemMerch registered successfully
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
 *                   example: Create redeem-merch berhasil!
 *       400:
 *         description: Invalid input or redeem-merch already exists
 *       401:
 *         description: Unauthorized
 */
redeemMerchRouter.post(
  "/api/redeem-merch",
  restrictTo("PEMBELI"),
  redeemMerchController.create
);

/**
 * @swagger
 * /api/redeem-merch/lists:
 *   get:
 *     summary: Get a list of redeem-merch and able to search
 *     tags: [RedeemMerch]
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
 *         description: Search term for nama_redeem-merch or detail_redeem-merch
 *     responses:
 *       200:
 *         description: List of redeem-merch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RedeemMerch'
 *       401:
 *         description: Unauthorized
 */
// redeemMerchRouter.get(
//   "/api/redeem-merch/lists",
//   restrictTo("PEGAWAI", "CS"),
//   redeemMerchController.getList
// );

/**
 * @swagger
 * /api/redeem-merch/allLists:
 *   get:
 *     summary: Get a list of merchandise redeem request and able to search
 *     tags: [RedeemMerch]
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
 *         description: Search term for nama merch
 *       - in: query
 *         name: searchPembeli
 *         schema:
 *           type: string
 *         description: Search term for nama pembeli
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
redeemMerchRouter.get(
  "/api/redeem-merch/allLists",
  restrictTo("PEGAWAI", "CS"),
  redeemMerchController.getAllList
);

/**
 * @swagger
 * /api/redeem-merch/{id}:
 *   get:
 *     summary: Get an redeem-merch by ID
 *     tags: [RedeemMerch]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: RedeemMerch ID (e.g., 123)
 *     responses:
 *       200:
 *         description: RedeemMerch details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/RedeemMerch'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: RedeemMerch not found
 */
redeemMerchRouter.get(
  "/api/redeem-merch/:id",
  restrictTo("PEMBELI", "PEGAWAI", "CS"),
  redeemMerchController.get
);

/**
 * @swagger
 * /api/redeem-merch/{id}:
 *   patch:
 *     summary: Update an redeem-merch
 *     tags: [RedeemMerch]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: RedeemMerch ID (e.g., 123)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_redeem-merch:
 *                 type: integer
 *                 example: 2
 *               nama_redeem-merch:
 *                 type: string
 *               detail_redeem-merch:
 *                 type: string
 *               status_default:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: RedeemMerch updated successfully
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
 *                   example: Update redeem-merch berhasil!
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: RedeemMerch not found
 */
redeemMerchRouter.patch(
  "/api/redeem-merch/:id",
  restrictTo("PEMBELI", "PEGAWAI", "CS"),
  redeemMerchController.update
);

export { redeemMerchRouter };
