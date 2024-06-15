"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/globals/Spinner/Spinner";
import { cn } from "@/lib/utils";

const LoginForm = ({ redirectUrl }) => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error);
        setError({ [result.error.includes("Password") ? "password" : "email"]: result.error });

        if (result.error === "Password does not match") {
          e.target.password.value = "";
        } else if (result.error === "Email Not Found") {
          e.target.reset();
        }

        return;
      }

      if (result.ok) {
        toast.success("Your account has been Login successful");
        router.push(redirectUrl ? redirectUrl : "/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto dark:shadow-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUserLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div>
              <Input
                className={cn(error.email && 'border-red-500')}
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {error.email && <p className="text-red-500"><small>{error.email}</small></p>}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {/* Uncomment the next line if you have a "Forgot your password?" link */}
              {/* <Link href="#" className="text-sm underline">Forgot your password?</Link> */}
            </div>
            <div>
              <Input
                className={cn(error.password && 'border-red-500')}
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
              {error.password && <p className="text-red-500"><small>{error.password}</small></p>}
            </div>
          </div>
          <Button disabled={loading} type="submit" className="w-full disabled:opacity-50 disabled:cursor-not-allowed">
            {loading && <Spinner />} Login
          </Button>
        </form>
        <div className="mt-4 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register/student" className="underline">Register</Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
