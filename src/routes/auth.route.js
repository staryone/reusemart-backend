import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import authController from "../controllers/auth.controller.js";

const authRouter = new express.Router();

/**
 * @swagger
 * /api/logout:
 *   delete:
 *     summary: Log out the current user
 *     tags: [User]
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
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Logout berhasil!
 *       401:
 *         description: Unauthorized
 */
authRouter.delete("/api/logout", authController.logout);

/**
 * @swagger
 * /api/logoutMobile:
 *   delete:
 *     summary: Log out the current user from Mobile App
 *     tags: [User]
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
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Logout berhasil!
 *       401:
 *         description: Unauthorized
 */
authRouter.delete("/api/logoutMobile", authController.logoutMobile);

export { authRouter };
