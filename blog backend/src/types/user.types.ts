export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  website: string | null;
}

export interface CreateUserInput {
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

export interface UpdateUserInput {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}