import { z } from "zod";

const userFields = {
  name: z.string().trim().min(2, "Name must contain at least 2 characters"),
  username: z
    .string()
    .trim()
    .min(3, "Username must contain at least 3 characters"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(7, "Phone number is invalid"),
  website: z.string().trim().min(3, "Website is invalid")
};

export const createUserSchema = z.object({
  ...userFields,
  phone: userFields.phone.optional(),
  website: userFields.website.optional()
});

export const updateUserSchema = z.object(userFields);

export const patchUserSchema = z
  .object({
    name: userFields.name.optional(),
    username: userFields.username.optional(),
    email: userFields.email.optional(),
    phone: userFields.phone.optional(),
    website: userFields.website.optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required"
  });

export const userIdSchema = z.object({
  id: z.coerce.number().int().positive("User ID must be a positive integer")
});