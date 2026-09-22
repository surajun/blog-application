import { Router } from "express";
import {
  addPost,
  getPost,
  getPostComments,
  getPosts,
  patchPost,
  removePost,
  replacePost
} from "../controllers/post.controller";
import {
  validateBody,
  validateParams
} from "../middlewares/validate.middleware";
import {
  createPostSchema,
  patchPostSchema,
  postIdSchema,
  updatePostSchema
} from "../validations/post.validation";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.get("/", asyncHandler(getPosts));

router.get(
  "/:id/comments",
  validateParams(postIdSchema),
  asyncHandler(getPostComments)
);

router.get(
  "/:id",
  validateParams(postIdSchema),
  asyncHandler(getPost)
);

router.post(
  "/",
  validateBody(createPostSchema),
  asyncHandler(addPost)
);

router.put(
  "/:id",
  validateParams(postIdSchema),
  validateBody(updatePostSchema),
  asyncHandler(replacePost)
);

router.patch(
  "/:id",
  validateParams(postIdSchema),
  validateBody(patchPostSchema),
  asyncHandler(patchPost)
);

router.delete(
  "/:id",
  validateParams(postIdSchema),
  asyncHandler(removePost)
);

export default router;