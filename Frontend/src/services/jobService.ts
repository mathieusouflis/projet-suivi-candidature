import { callApiWithAuth } from "./apiService";
import { CreateJob, UpdateJob } from "@/types/job.ts";

export const getJobs = async () => {
  return await callApiWithAuth("/applications", "GET");
};

export const getJobById = async (id: string) => {
  return await callApiWithAuth(`/applications?id=${id}`, "GET");
};

export const createJob = async (job: CreateJob) => {
  return await callApiWithAuth("/applications", "POST", job);
};

export const updateJob = async (id: string, changements: UpdateJob) => {
  return await callApiWithAuth(`/applications/${id}`, "PUT", changements);
};

export const deleteJob = async (id: string) => {
  return await callApiWithAuth(`/applications/${id}`, "DELETE");
};
