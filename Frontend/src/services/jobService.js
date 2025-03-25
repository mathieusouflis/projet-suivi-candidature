import { callApiWithAuth } from "./apiService";

export const getJobs = async () => {
    return await callApiWithAuth('/jobs', 'GET');
}

export const getJobById = async (id) => {
    return await callApiWithAuth(`/jobs/${id}`, 'GET');
}

export const createJob = async (job) => {
    return await callApiWithAuth('/jobs', 'POST', job);
}

export const updateJob = async (job) => {
    return await callApiWithAuth(`/jobs/${job.id}`, 'PUT', job);
}

export const deleteJob = async (id) => {
    return await callApiWithAuth(`/jobs/${id}`, 'DELETE');
}