import { callApiWithAuth } from "./apiService";
import { Job } from "@/types/job.ts"

export const getJobs = async () => {
    return await callApiWithAuth('/jobs', 'GET');
}

export const getJobById = async (id: number) => {
    return await callApiWithAuth(`/jobs/${id}`, 'GET');
}

export const createJob = async (job: Job) => {
    return await callApiWithAuth('/jobs', 'POST', job);
}

export const updateJob = async (job: Job) => {
    return await callApiWithAuth(`/jobs/${job.id}`, 'PUT', job);
}

export const deleteJob = async (id: number) => {
    return await callApiWithAuth(`/jobs/${id}`, 'DELETE');
}