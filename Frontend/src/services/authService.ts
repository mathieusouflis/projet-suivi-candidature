import { callApi } from "./apiService.ts";

export const login = async (email: string, password: string) => {
  return await callApi("/auth/login", "POST", { email, password });
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  return await callApi("/auth/register", "POST", { username, email, password });
};
