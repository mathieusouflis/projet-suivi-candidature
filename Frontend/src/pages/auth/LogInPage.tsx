import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { login } from "@/services/authService";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/middleware/Token.middleware";

const formSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await login(data.email, data.password);
    if (!result.success) {
      form.setError("email", { message: result.error.message });
      return;
    } else {
      const data = result.data;
      loginUser(data.token);
      navigate("/dashboard");
    }
  }

  return (
    <div className="h-full flex items-center justify-center">
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
                    <Input placeholder="Email" type="email" {...field} />
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>

        <CardFooter className="justify-center">
          <Link to="/auth/register">
            <Button variant="link">Don't have an account ?</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
