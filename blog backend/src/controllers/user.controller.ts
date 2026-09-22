import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getPostsByUserId,
  getUserById,
  updateUser
} from "../services/user.service";
import { CreateUserInput, UpdateUserInput } from "../types/user.types";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsers();

  return res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  return res.status(200).json(user);
};

export const addUser = async (req: Request, res: Response) => {
  const user = await createUser(req.body as CreateUserInput);

  return res.status(201).json(user);
};

export const replaceUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const existingUser = await getUserById(id);

  if (!existingUser) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const user = await updateUser(
    id,
    req.body as CreateUserInput
  );

  return res.status(200).json(user);
};

export const patchUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const existingUser = await getUserById(id);

  if (!existingUser) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const user = await updateUser(
    id,
    req.body as UpdateUserInput
  );

  return res.status(200).json(user);
};

export const removeUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = await deleteUser(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  return res.status(200).json({
    message: "User deleted successfully"
  });
};

export const getUserPosts = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const posts = await getPostsByUserId(id);

  return res.status(200).json(posts);
};