import { z } from "zod";

const userId = z.coerce
  .number()
  .int()
  .positive("userId must be a positive integer");

const title = z
  .string()
  .trim()
  .min(1, "Title is required");

const body = z
  .string()
  .trim()
  .min(1, "Body is required");

export const createPostSchema = z.object({
  userId,
  title,
  body
});

export const updatePostSchema = z.object({
  userId,
  title,
  body
});

export const patchPostSchema = z
  .object({
    userId: userId.optional(),
    title: title.optional(),
    body: body.optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required"
  });

export const postIdSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("Post ID must be a positive integer")
});