export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CreatePostInput {
  userId: number;
  title: string;
  body: string;
}

export interface UpdatePostInput {
  userId?: number;
  title?: string;
  body?: string;
}