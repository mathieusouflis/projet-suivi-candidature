import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createJob } from "@/services/jobService";
import { JobType } from "@/types/job";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectGroup, SelectLabel, SelectValue } from "@radix-ui/react-select";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(["Internship", "Apprenticeship", "Full-time", "Contract", "Freelance"], {
    required_error: "Please select a job type",
    invalid_type_error: "Job type must be one of the predefined values",
  }),
  status: z.enum(["Need to apply", "Pending", "Interview", "Technical Test", "Accepted", "Rejected"]),
  link: z.string().optional(),
  location: z.string().optional(),
  salary: z.number().optional(),
})

const JobForm = ({setOpen}: {setOpen?: (open: boolean) => void}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      description: "",
      type: "Internship",
      status: "Need to apply",
      link: "",
      location: "",
      salary: 0,
    }
  });

  type FormFieldsType = "title" | "company" | "description" | "type" | "status" | "link" | "location" | "salary"
  type FormField = {
    name: FormFieldsType;
    item: "input" | "select";
    type?: string;
    options?: string[];
  };
  
  const formFields: FormField[] = [
    { name: "title", item: "input", type: "text" },
    { name: "company", item: "input", type: "text" },
    { name: "description", item: "input", type: "text" },
    { 
      name: "type", 
      item: "select", 
      options: ["Internship", "Apprenticeship", "Full-time", "Contract", "Freelance"]
    },
    { 
      name: "status", 
      item: "select", 
      options: ["Need to apply", "Pending", "Interview", "Technical Test", "Accepted", "Rejected"]
    },
    { name: "link", item: "input", type: "text" },
    { name: "location", item: "input", type: "text" },
    { name: "salary", item: "input", type: "text" }
  ];

  async function onSubmit(data: z.infer<typeof formSchema>) {
      createJob(data);
      form.reset();
      setOpen && setOpen(false);
  }

  return (
    <Card className="p-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {formFields.map((field: FormField) => {
            const { name, item, options } = field;
            const nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);

            if (item === 'input') {
              return (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{nameUppercase}</FormLabel>
                      <FormControl>
                        <Input 
                          type={name === 'salary' ? 'number' : 'text'}
                          placeholder={`Enter ${nameUppercase}`}
                          {...field}
                          value={name === 'salary' ? field.value?.toString() : field.value}
                          onChange={(e) => {
                            const value = name === 'salary' 
                              ? parseFloat(e.target.value) || 0 
                              : e.target.value;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              );
            }

            if (item === 'select') {
              return (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{nameUppercase}</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{nameUppercase}</SelectLabel>
                                    {options?.map((option) => (
                                        <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              );
            }
          })}
            <Button type="submit" className="w-full">Submit Job</Button>
          </form>
        </Form>
      </Card>
  );
}

export default JobForm;