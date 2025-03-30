import { User } from "@/types/user";
import { callApi } from "./apiService";

export const createUser = async (user: User) => {
  return await callApi("/users", "POST", user);
};

export const getUserById = async (id: number) => {
  return await callApi(`/users/${id}`, "GET");
};

export const updateUser = async (user: User) => {
  return await callApi(`/users/${user.id}`, "PUT", user);
};

export const deleteUser = async (id: number) => {
  return await callApi(`/users/${id}`, "DELETE");
};
