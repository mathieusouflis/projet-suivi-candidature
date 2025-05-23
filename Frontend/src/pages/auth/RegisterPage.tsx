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
import { register } from "@/services/authService";
import { Link, useNavigate } from "react-router";

const formSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .nonempty("Username is required"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least 8 characters, including uppercase, lowercase, and number"
    )
    .nonempty("Password is required"),
  passwordConfirm: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Confirm Password must contain at least 8 characters, including uppercase, lowercase, and number"
    )
    .nonempty("Confirm Password is required"),
});

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { email, username, password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      form.setError("passwordConfirm", { message: "Passwords do not match" });
      return;
    }

    const result = await register(username, email, password);

    if (!result.success) {
      form.setError("passwordConfirm", { message: result.error.message });
      return;
    } else {
      const user = result.data;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/auth/login");
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
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
        <CardFooter className="justify-center">
          <Link to="/auth/login">
            <Button variant="link">Already have an account ?</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
