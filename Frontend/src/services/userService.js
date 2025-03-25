import { callApi } from "./apiService";

export const createUser = async (user) => {
    return await callApi('/users', 'POST', user);
}

export const getUserById = async (id) => {
    return await callApi(`/users/${id}`, 'GET');
}

export const updateUser = async (user) => {
    return await callApi(`/users/${user.id}`, 'PUT', user);
}

export const deleteUser = async (id) => {
    return await callApi(`/users/${id}`, 'DELETE');
}