import { apiRequest } from "./api";
import type { User } from "../types/user";

export function getUsers() {
  return apiRequest<User[]>("/users");
}

export function getUserById(id: number) {
  return apiRequest<User>(`/users/${id}`);
}