import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      await register(formData).unwrap();
      navigate("/dashboard");
    } catch (err: any) {
      setError("root", { message: err.data?.message || "Registration failed" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
      <Input
        label="Full Name"
        registration={registerField("name")}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        type="email"
        registration={registerField("email")}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        registration={registerField("password")}
        error={errors.password?.message}
      />
      {errors.root && (
        <p className="text-red-500 text-sm mb-2">{errors.root.message}</p>
      )}
      <Button type="submit" isLoading={isLoading} className="w-full">
        Register
      </Button>
    </form>
  );
};
