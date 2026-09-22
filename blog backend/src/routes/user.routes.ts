import { Router } from "express";
import {
  addUser,
  getUser,
  getUserPosts,
  getUsers,
  patchUser,
  removeUser,
  replaceUser
} from "../controllers/user.controller";
import {
  validateBody,
  validateParams
} from "../middlewares/validate.middleware";
import {
  createUserSchema,
  patchUserSchema,
  updateUserSchema,
  userIdSchema
} from "../validations/user.validation";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.get("/", asyncHandler(getUsers));

router.get(
  "/:id/posts",
  validateParams(userIdSchema),
  asyncHandler(getUserPosts)
);

router.get(
  "/:id",
  validateParams(userIdSchema),
  asyncHandler(getUser)
);

router.post(
  "/",
  validateBody(createUserSchema),
  asyncHandler(addUser)
);

router.put(
  "/:id",
  validateParams(userIdSchema),
  validateBody(updateUserSchema),
  asyncHandler(replaceUser)
);

router.patch(
  "/:id",
  validateParams(userIdSchema),
  validateBody(patchUserSchema),
  asyncHandler(patchUser)
);

router.delete(
  "/:id",
  validateParams(userIdSchema),
  asyncHandler(removeUser)
);

export default router;