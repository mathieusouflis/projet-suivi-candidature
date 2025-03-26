export type JobType = "Internship" | "Apprenticeship" | "Full-time" | "Contract" | "Freelance";
export type JobStatus = "Need to apply" | "Pending" | "Interview" | "Technical Test" | "Accepted" | "Rejected";
export interface Job {
    id: string,
    title: string,
    company: string,
    description: string,
    type: JobType;
    status: JobStatus;
    link: string,
    location: string,
    salary: number,
    createdAt: string,

    postulatedDate?: string,
    meetingDate?: string,
    testDate?: string,
}

export interface UpdateJob {
    title?: string,
    company?: string,
    description?: string,
    type?: JobType;
    status?: JobStatus;
    link?: string,
    location?: string,
    salary?: number,

    postulatedDate?: string,
    meetingDate?: string,
    testDate?: string,
}