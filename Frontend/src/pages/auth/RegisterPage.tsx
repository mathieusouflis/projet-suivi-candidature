import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { register } from "@/services/authService";
import { useNavigate } from "react-router";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  username: z.string().min(4, "Username must be at least 4 characters long"),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"),
  passwordConfirm: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Confirm Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"),
})

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    }
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const {email, username, password, passwordConfirm} = data;
    
    if (password !== passwordConfirm) {
      form.setError("passwordConfirm", { message: "Passwords do not match" });
      return;
    }
    
    const result = await register(username, email, password);
    
    if (!result.success) {
      form.setError("passwordConfirm", { message: result.error.message });
      return;
    }else {
      const user = result.data;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="p-4 sm:w-sm lg:w-lg xl:w-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField 
              control={form.control} 
              name="email" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
              />
            <FormField 
              control={form.control} 
              name="username" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
              />
            <FormField 
              control={form.control} 
              name="email" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
              />
            <FormField 
              control={form.control} 
              name="passwordConfirm" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400"/>
                </FormItem>
              )}
              />
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default Register;