import { Request, Response } from "express";
import { getPostById } from "../services/post.service";
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment
} from "../services/comment.service";
import {
  CreateCommentInput,
  UpdateCommentInput
} from "../types/comment.types";

// Get all comments, optionally filtered by postId

export const getComments = async (
  req: Request,
  res: Response
) => {
  const postId = req.query.postId
    ? Number(req.query.postId)
    : undefined;

  const comments = await getAllComments(postId);

  return res.status(200).json(comments);
};

// Get a single comment by ID

export const getComment = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const comment = await getCommentById(id);

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found"
    });
  }

  return res.status(200).json(comment);
};

// Create a new comment

export const addComment = async (
  req: Request,
  res: Response
) => {
  const commentData = req.body as CreateCommentInput;

  const post = await getPostById(commentData.postId);

  if (!post) {
    return res.status(400).json({
      message: "Post not found"
    });
  }

  const comment = await createComment(commentData);

  return res.status(201).json(comment);
};

export const replaceComment = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);
  const commentData = req.body as CreateCommentInput;

  const existingComment = await getCommentById(id);

  if (!existingComment) {
    return res.status(404).json({
      message: "Comment not found"
    });
  }

  const post = await getPostById(commentData.postId);

  if (!post) {
    return res.status(400).json({
      message: "Post not found"
    });
  }

  const comment = await updateComment(id, commentData);

  return res.status(200).json(comment);
};


// Partially update an existing comment (PATCH)

export const patchComment = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);
  const commentData = req.body as UpdateCommentInput;

  const existingComment = await getCommentById(id);

  if (!existingComment) {
    return res.status(404).json({
      message: "Comment not found"
    });
  }

  if (commentData.postId !== undefined) {
    const post = await getPostById(commentData.postId);

    if (!post) {
      return res.status(400).json({
        message: "Post not found"
      });
    }
  }

  const comment = await updateComment(id, commentData);

  return res.status(200).json(comment);
};

export const removeComment = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const comment = await deleteComment(id);

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found"
    });
  }

  return res.status(200).json({
    message: "Comment deleted successfully"
  });
};