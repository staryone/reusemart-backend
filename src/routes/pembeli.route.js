import express from "express";
import pembeliController from "../controllers/pembeli.controller.js";
import { restrictTo } from "../middleware/restrictTo.middleware.js";

const pembeliRouter = new express.Router();

/**
 * @swagger
 * /api/pembeli/current:
 *   get:
 *     summary: Get current pembeli profile
 *     tags: [Pembeli]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Pembeli profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Pembeli'
 *       401:
 *         description: Unauthorized
 */
pembeliRouter.get(
  "/api/pembeli/current",
  restrictTo("PEMBELI"),
  pembeliController.profile
);

/**
 * @swagger
 * /api/pembeli/logout:
 *   delete:
 *     summary: Log out the current pembeli
 *     tags: [Pembeli]
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
pembeliRouter.delete(
  "/api/pembeli/logout",
  restrictTo("PEMBELI"),
  pembeliController.logout
);

export { pembeliRouter };
