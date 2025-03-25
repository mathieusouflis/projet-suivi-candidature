import { callApi } from "./apiService";

export const login = async (email, password) => {
    return await callApi('/auth/login', 'POST', { email, password });
}

export const register = async (email, password) => {
    return await callApi('/auth/register', 'POST', { username, email, password });
}