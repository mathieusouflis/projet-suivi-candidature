import { TypographyH1, TypographyH2 } from '@/components/ui/Typograpgy';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { PopoverContent } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { getJobById, updateJob } from '@/services/jobService';
import { Job } from '@/types/job';
import { Label } from '@radix-ui/react-label';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
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
    const [dateTimeout, setDateTimeout] = useState<NodeJS.Timeout | null>(null);
    const [fakeDate, setFakeDate] = useState<Date>(new Date());


    useEffect(() => {
        const fetchJob = async () => {
        if(!id) return;
        try {
            const response = await getJobById(id);
            if (!response.success) {
                return;
            }
            
            const data = await response.data[0];
            data?.postulatedDate && setFakeDate(new Date(data.postulatedDate));
            setJob(data);
        } catch (err) {
            throw new Error(err instanceof Error ? err.message : 'An error occurred');
        }
        };

        fetchJob();
    }, []);

const handleChangements = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | {target: { value: string}}, valueTimeout: any, setTimeoutEffect: any, key: keyof Job): void => {
    const newValue = e.target.value;
    setJob(prev => prev? {...prev, [key]: newValue } : null);
    
    
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
const statusOptions = ["Need to apply", "Pending", "Interview", "Technical Test", "Accepted", "Rejected"];
const typeOptions = ["Internship", "Apprenticeship", "Full-time", "Contract", "Freelance"];
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
                        <Select onValueChange={(e) => handleChangements({target: {value: e}}, typeTimeout, setTypeTimeout, "type")}>
                          <SelectTrigger>
                            <SelectValue placeholder={job?.type || "No Type"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Type</SelectLabel>
                                    {typeOptions?.map((option) => (
                                        <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Status</Label>
                        <Select onValueChange={(e) => handleChangements({target: {value: e}}, statusTimeout, setStatusTimeout, "status")}>
                          <SelectTrigger>
                            <SelectValue placeholder={job?.status || "No status"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                    {statusOptions?.map((option) => (
                                        <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                    </div>
                    {job?.status === "Pending" && <div>
                        <Label>Postulated Date</Label>
                        <Popover>
                            <PopoverTrigger>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !job?.datePostulation && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {job?.datePostulation ? format(job?.datePostulation, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={ fakeDate }
                                    onSelect={(e) => {
                                        if (e) {
                                            handleChangements({target: {value: e.toISOString()}}, dateTimeout, setDateTimeout, "datePostulation");
                                            setFakeDate(e);
                                        }
                                    }}
                                    initialFocus
                                    />
                                </PopoverContent>
                        </Popover>
                    </div>}
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
