import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();
      // The extra reducer updates the store automatically
      // Redirect based on role
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError("root", { message: err.data?.message || "Login failed" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
      <Input
        label="Email"
        type="email"
        registration={register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        registration={register("password")}
        error={errors.password?.message}
      />
      {errors.root && (
        <p className="text-red-500 text-sm mb-2">{errors.root.message}</p>
      )}
      <Button type="submit" isLoading={isLoading} className="w-full">
        Login
      </Button>
    </form>
  );
};
