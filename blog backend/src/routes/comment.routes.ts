import { Router } from "express";
import {
  addComment,
  getComment,
  getComments,
  patchComment,
  removeComment,
  replaceComment
} from "../controllers/comment.controller";
import {
  validateBody,
  validateParams,
  validateQuery
} from "../middlewares/validate.middleware";
import {
  commentIdSchema,
  commentPostQuerySchema,
  createCommentSchema,
  patchCommentSchema,
  updateCommentSchema
} from "../validations/comment.validation";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.get(
  "/",
  validateQuery(commentPostQuerySchema),
  asyncHandler(getComments)
);

router.get(
  "/:id",
  validateParams(commentIdSchema),
  asyncHandler(getComment)
);

router.post(
  "/",
  validateBody(createCommentSchema),
  asyncHandler(addComment)
);

router.put(
  "/:id",
  validateParams(commentIdSchema),
  validateBody(updateCommentSchema),
  asyncHandler(replaceComment)
);

router.patch(
  "/:id",
  validateParams(commentIdSchema),
  validateBody(patchCommentSchema),
  asyncHandler(patchComment)
);

router.delete(
  "/:id",
  validateParams(commentIdSchema),
  asyncHandler(removeComment)
);

export default router;
