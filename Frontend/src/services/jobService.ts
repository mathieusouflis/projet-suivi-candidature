import { callApiWithAuth } from "./apiService";
import { Job, UpdateJob } from "@/types/job.ts"

export const getJobs = async () => {
    return await callApiWithAuth('/jobs', 'GET');
}

export const getJobById = async (id: string) => {
    return await callApiWithAuth(`/jobs/${id}`, 'GET');
}

export const createJob = async (job: Job) => {
    return await callApiWithAuth('/jobs', 'POST', job);
}

export const updateJob = async (id: string, changements: UpdateJob) => {
    return await callApiWithAuth(`/jobs/${id}`, 'PUT', changements);
}

export const deleteJob = async (id: string) => {
    return await callApiWithAuth(`/jobs/${id}`, 'DELETE');
}