import { supabase } from "../config/supabase";
import {
  CreatePostInput,
  UpdatePostInput
} from "../types/post.types";

const mapPost = (post: any) => ({
  id: post.id,
  userId: post.user_id,
  title: post.title,
  body: post.body
});

export const getAllPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("id");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapPost);
};

export const getPostById = async (id: number) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapPost(data) : null;
};

export const createPost = async (post: CreatePostInput) => {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: post.userId,
      title: post.title,
      body: post.body
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapPost(data);
};

export const updatePost = async (
  id: number,
  post: UpdatePostInput
) => {
  const updateData: Record<string, unknown> = {};

  if (post.userId !== undefined) {
    updateData.user_id = post.userId;
  }

  if (post.title !== undefined) {
    updateData.title = post.title;
  }

  if (post.body !== undefined) {
    updateData.body = post.body;
  }

  const { data, error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapPost(data) : null;
};

export const deletePost = async (id: number) => {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapPost(data) : null;
};

export const getCommentsByPostId = async (postId: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("id");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((comment) => ({
    id: comment.id,
    postId: comment.post_id,
    name: comment.name,
    email: comment.email,
    body: comment.body
  }));
};