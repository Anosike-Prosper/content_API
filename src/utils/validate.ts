import { NextFunction, Request, Response } from "express";
import { checkSchema, Schema, validationResult } from "express-validator";

export const validate =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validations = checkSchema(schema);
      await Promise.all(validations.map((validation) => validation.run(req)));
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      // Concatenate all error messages into a single string
      const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");

      return res.status(400).json({
        status: 400,
        error: errorMessages,
        message: "Validation Error",
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        errors: {
          error: "Internal Server Error",
          message: error.message || "An unexpected error occurred",
        },
      });
    }
  };

