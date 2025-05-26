import express from "express";
import { restrictTo } from "../middleware/restrictTo.middleware.js";
import ratingController from "../controllers/rating.controller.js";

const ratingRouter = new express.Router();

ratingRouter.patch(
  "/api/rating/:id",
  restrictTo("PEMBELI"),
  ratingController.updateRating
);

export { ratingRouter };