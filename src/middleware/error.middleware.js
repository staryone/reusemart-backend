import Joi from "joi";
import { ResponseError } from "../errors/response.error.js";
import { Prisma } from "@prisma/client";

const { ValidationError } = Joi;

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        errors: err.message,
      })
      .end();
  } else if (err instanceof ValidationError) {
    res
      .status(400)
      .json({
        errors: err.message,
      })
      .end();
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    res
      .status(500)
      .json({
        errors: "Server unavailable, can't reach database server",
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        errors: "Internal server error",
      })
      .end();
  }
};

export { errorMiddleware };
