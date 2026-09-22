import { Request, Response } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getCommentsByPostId,
  getPostById,
  updatePost
} from "../services/post.service";
import { supabase } from "../config/supabase";
import {
  CreatePostInput,
  UpdatePostInput
} from "../types/post.types";

const userExists = async (userId: number) => {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
};

export const getPosts = async (_req: Request, res: Response) => {
  const posts = await getAllPosts();

  return res.status(200).json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const post = await getPostById(id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  return res.status(200).json(post);
};

export const addPost = async (req: Request, res: Response) => {
  const postData = req.body as CreatePostInput;

  const exists = await userExists(postData.userId);

  if (!exists) {
    return res.status(400).json({
      message: "User not found"
    });
  }

  const post = await createPost(postData);

  return res.status(201).json(post);
};

export const replacePost = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);
  const postData = req.body as CreatePostInput;

  const existingPost = await getPostById(id);

  if (!existingPost) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  const exists = await userExists(postData.userId);

  if (!exists) {
    return res.status(400).json({
      message: "User not found"
    });
  }

  const post = await updatePost(id, postData);

  return res.status(200).json(post);
};

export const patchPost = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);
  const postData = req.body as UpdatePostInput;

  const existingPost = await getPostById(id);

  if (!existingPost) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  if (postData.userId !== undefined) {
    const exists = await userExists(postData.userId);

    if (!exists) {
      return res.status(400).json({
        message: "User not found"
      });
    }
  }

  const post = await updatePost(id, postData);

  return res.status(200).json(post);
};

export const removePost = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const post = await deletePost(id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  return res.status(200).json({
    message: "Post deleted successfully"
  });
};

export const getPostComments = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const post = await getPostById(id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  const comments = await getCommentsByPostId(id);

  return res.status(200).json(comments);
};