import {
  NextFunction,
  Request,
  RequestHandler,
  Response
} from "express";
import { ZodIssue, ZodType } from "zod";

const formatValidationErrors = (issues: ZodIssue[]) =>
  issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message
  }));

export const validateBody = (schema: ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: formatValidationErrors(result.error.issues)
      });
    }

    req.body = result.data;
    next();
  };
};

export const validateParams = (schema: ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: formatValidationErrors(result.error.issues)
      });
    }

    next();
  };
};

export const validateQuery = (schema: ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: formatValidationErrors(result.error.issues)
      });
    }

    next();
  };
};