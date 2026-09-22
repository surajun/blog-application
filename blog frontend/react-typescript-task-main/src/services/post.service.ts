import { apiRequest } from "./api";
import type { Post } from "../types/post";
import type { Comment } from "../types/comment";

export function getPosts() {
  return apiRequest<Post[]>("/posts");
}

export function getPostById(id: number) {
  return apiRequest<Post>(`/posts/${id}`);
}

export function getPostComments(id: number) {
  return apiRequest<Comment[]>(`/posts/${id}/comments`);
}