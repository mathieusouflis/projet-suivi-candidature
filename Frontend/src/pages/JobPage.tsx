import { TypographyH1, TypographyH2 } from '@/components/ui/Typograpgy';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { getJobById, updateJob } from '@/services/jobService';
import { Job } from '@/types/job';
import { Label } from '@radix-ui/react-label';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const JobPage = () => {
    const { id } = useParams() as {id: string};
    const [job, setJob] = useState<Job | null>(null);
    const [titleTimeout, setTitleTimeout] = useState<NodeJS.Timeout | null>(null);
    const [descriptionTimeout, setDescriptionTimeout] = useState<NodeJS.Timeout | null>(null);
    const [companyTimeout, setCompanyTimeout] = useState<NodeJS.Timeout | null>(null);
    const [typeTimeout, setTypeTimeout] = useState<NodeJS.Timeout | null>(null);
    const [statusTimeout, setStatusTimeout] = useState<NodeJS.Timeout | null>(null);
    const [linkTimeout, setLinkTimeout] = useState<NodeJS.Timeout | null>(null);
    const [locationTimeout, setLocationTimeout] = useState<NodeJS.Timeout | null>(null);
    const [salaryTimeout, setSalaryTimeout] = useState<NodeJS.Timeout | null>(null);



    useEffect(() => {
        const fetchJob = async () => {
        if(!id) return;
        try {
            const response = await getJobById(id);
            if (!response.success) {
                return;
            }
            const data = await response.data();
            setJob(data);
        } catch (err) {
            throw new Error(err instanceof Error ? err.message : 'An error occurred');
        }
        };

        fetchJob();
    }, [id]);

//TODO: Find the type of timeout effect
const handleChangements = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, valueTimeout: any, setTimeoutEffect: any, key: keyof Job): void => {
    const newValue = e.target.value;
    setJob(prev => prev? {...prev, [key]: newValue } : null);
    console.log(job);
    
    
    if (valueTimeout) {
        clearTimeout(valueTimeout);
    }
    
    const timeout = setTimeout(async () => {
        try {
            const response = await updateJob(id, { [key]: newValue })
            if (!response.success) {
                return console.error('Failed to update ' + key);
            }

            setJob(prev => prev ? { ...prev, [key]: newValue } : null);
        } catch (error) {
            console.error('Error updating ' + key);
        }
    }, 3000);
    
    setTimeoutEffect(timeout);
};

    if (!job) return <div>Job not found</div>;

    return (
        <>
            <div className='flex flex-row h-full max-h-full w-full'>
                <div className="w-full flex flex-col gap-3 p-4">
                    <TypographyH1>
                        {job?.title || "No jobs"}
                    </TypographyH1>
                    <Textarea className='resize-none h-full' placeholder='Job description' defaultValue={job?.description || "No description"} onChange={(e) => handleChangements(e, descriptionTimeout, setDescriptionTimeout, "description")} />
                </div>
                <Separator orientation='vertical'/>
                <div className="p-4 w-sm flex flex-col gap-3">
                    <TypographyH2>Settings</TypographyH2>
                    <div>
                        <Label>Title</Label>
                        <Input type='text' id="Title" placeholder='Title' defaultValue={job?.title || ""} onChange={(e) => handleChangements(e, titleTimeout, setTitleTimeout, "title")}/>
                    </div>
                    <div>
                        <Label>Company</Label>
                        <Input type='text' id="Company" placeholder='Company' defaultValue={job?.company || ""} onChange={(e) => handleChangements(e, companyTimeout, setCompanyTimeout, "company")}/>
                    </div>
                    <div>
                        <Label>Type</Label>
                        <Input type='text' id="Type" placeholder='Type' defaultValue={job?.type || ""} onChange={(e) => handleChangements(e, typeTimeout, setTypeTimeout, "type")}/>
                    </div>
                    <div>
                        <Label>Status</Label>
                        <Input type='text' id="Status" placeholder='Status' defaultValue={job?.status || ""} onChange={(e) => handleChangements(e, statusTimeout, setStatusTimeout, "status")}/>
                    </div>
                    <div>
                        <Label>Link</Label>
                        <Input type='text' id="Link" placeholder='Link' defaultValue={job?.link || ""} onChange={(e) => handleChangements(e, linkTimeout, setLinkTimeout, "link")}/>
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input type='text' id="Location" placeholder='Location' defaultValue={job?.location || ""} onChange={(e) => handleChangements(e, locationTimeout, setLocationTimeout, "location")}/>
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input type='text' id="Salary" placeholder='Salary' defaultValue={job?.salary || ""} onChange={(e) => handleChangements(e, salaryTimeout, setSalaryTimeout, "salary")}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobPage;
