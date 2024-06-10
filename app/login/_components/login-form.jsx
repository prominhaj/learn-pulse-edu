import Link from "next/link";
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

const LoginForm = () => {
  return (
    <>
      <Card className="w-full max-w-sm mx-auto dark:shadow-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Login Form */}
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link href="#" className="inline-block ml-auto text-sm underline">
                Forgot your password?
              </Link> */}
                </div>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>

          <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="register" className="underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}


export default LoginForm;