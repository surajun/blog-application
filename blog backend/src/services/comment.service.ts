import { supabase } from "../config/supabase";
import {
  CreateCommentInput,
  UpdateCommentInput
} from "../types/comment.types";

const mapComment = (comment: {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}) => ({
  id: comment.id,
  postId: comment.post_id,
  name: comment.name,
  email: comment.email,
  body: comment.body
});

export const getAllComments = async (postId?: number) => {
  let query = supabase
    .from("comments")
    .select("*")
    .order("id");

  if (postId !== undefined) {
    query = query.eq("post_id", postId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapComment);
};

export const getCommentById = async (id: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapComment(data) : null;
};

export const createComment = async (
  comment: CreateCommentInput
) => {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: comment.postId,
      name: comment.name,
      email: comment.email,
      body: comment.body
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapComment(data);
};

export const updateComment = async (
  id: number,
  comment: UpdateCommentInput
) => {
  const updateData: Record<string, unknown> = {};

  if (comment.postId !== undefined) {
    updateData.post_id = comment.postId;
  }

  if (comment.name !== undefined) {
    updateData.name = comment.name;
  }

  if (comment.email !== undefined) {
    updateData.email = comment.email;
  }

  if (comment.body !== undefined) {
    updateData.body = comment.body;
  }

  const { data, error } = await supabase
    .from("comments")
    .update(updateData)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapComment(data) : null;
};

export const deleteComment = async (id: number) => {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapComment(data) : null;
};