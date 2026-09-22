export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CreateCommentInput {
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface UpdateCommentInput {
  postId?: number;
  name?: string;
  email?: string;
  body?: string;
}