import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { login } from "@/services/authService";
import { Link, useNavigate } from "react-router";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character")
})

const LoginPage = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await login(data.email, data.password);
    if (!result.success) {
      form.setError("email", { message: result.error.message });
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
              name="password" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400"/>
                </FormItem>
              )}
              />
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </Form>

        <CardFooter className="justify-center">
          <Link to="/auth/login">
            <Button variant="link">Don't have an account ?</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;