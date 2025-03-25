export interface Job {
    id: number;
    status: string;
    type: string;
    link: string;
    tags: string[];
    title: string;
    description: string;
    userId: number;
    postulated_date: string;
    creationDate: string;
    lastUpdatedDate: string;
}