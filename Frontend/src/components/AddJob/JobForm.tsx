import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().optional(),
  description: z.string().optional(),
  type: z.string().min(1, "Type is required"),
  status: z.string().min(1, "Status is required"),
  link: z.string().optional(),
  location: z.string().optional(),
  salary: z.number().optional(),
})

const JobForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      description: "",
      type: "",
      status: "",
      link: "",
      location: "",
      salary: 0,
    }
  });

  type FormFieldsType = "title" | "company" | "description" | "type" | "status" | "link" | "location" | "salary"
  const formFields: FormFieldsType[] = ["title", "company", "description", "type", "status", "link", "location", "salary"];

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="p-4 sm:w-sm lg:w-lg xl:w-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {formFields.map((fieldName: FormFieldsType) => {
              const fieldNameUppercase = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldNameUppercase}</FormLabel>
                      <FormControl>
                        <Input 
                          type={fieldName === 'salary' ? 'number' : 'text'}
                          placeholder={fieldNameUppercase} 
                          {...field} 
                          value={fieldName === 'salary' ? field.value?.toString() : field.value}
                          onChange={(e) => {
                            const value = fieldName === 'salary' ? 
                              parseFloat(e.target.value) || 0 : 
                              e.target.value;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              )
            })}
            <Button type="submit" className="w-full">Submit Job</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default JobForm;