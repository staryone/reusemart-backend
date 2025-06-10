import express from "express";
import merchandiseController from "../controllers/merchandise.controller.js";
import { restrictTo } from "../middleware/restrictTo.middleware.js";

const merchandiseRouter = new express.Router();

merchandiseRouter.get(
  "/api/merchandise",
  restrictTo("PEMBELI"),
  merchandiseController.getList
);

merchandiseRouter.get(
  "/api/merchandise/:id",
  restrictTo("PEMBELI"),
  merchandiseController.get
);

merchandiseRouter.patch(
  "/api/merchandise/:id",
  restrictTo("PEMBELI"),
  merchandiseController.update
);

export { merchandiseRouter };
