import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import penitipanController from "../controllers/penitipan.controller.js";

const penitipanRouter = new express.Router();

penitipanRouter.post(
  "/api/penitipan",
  restrictTo("GUDANG"),
  penitipanController.create
);

export { penitipanRouter };