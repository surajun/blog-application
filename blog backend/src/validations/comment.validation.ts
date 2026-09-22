import { z } from "zod";

const postId = z.coerce
  .number()
  .int()
  .positive("postId must be a positive integer");

const name = z
  .string()
  .trim()
  .min(2, "Name must contain at least 2 characters");

const email = z
  .string()
  .trim()
  .email("Invalid email address");

const body = z
  .string()
  .trim()
  .min(1, "Body is required");

export const createCommentSchema = z.object({
  postId,
  name,
  email,
  body
});

export const updateCommentSchema = z.object({
  postId,
  name,
  email,
  body
});

export const patchCommentSchema = z
  .object({
    postId: postId.optional(),
    name: name.optional(),
    email: email.optional(),
    body: body.optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required"
  });

export const commentIdSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("Comment ID must be a positive integer")
});

export const commentPostQuerySchema = z.object({
  postId: postId.optional()
});