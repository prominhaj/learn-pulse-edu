'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { userValidation, } from '@/lib/FormValidation/users/userValidation';
import RegisterFrom from './RegisterFrom/RegisterFrom';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createAccount } from '@/app/actions/user';

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleCreateAccount = async (formData) => {
    setError(null)
    try {
      const singUp = await userValidation(formData);
      if (singUp.errors) {
        setError(singUp.errors);
        return;
      }
      else if (singUp.success) {
        const { firstName, lastName, email, password } = singUp.data;
        const user = {
          firstName, lastName, email, password
        }
        const createUser = await createAccount(user);
        if (!createUser.success) {
          toast.error(createUser.message)
          return;
        }
        else if (createUser.success) {
          toast.success(createUser.message)
          router.push('/login')
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Card className="relative max-w-sm mx-auto dark:shadow-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">
          Sign Up
        </CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>

        <RegisterFrom formAction={handleCreateAccount} state={error} />

        <div className="mt-4 text-sm text-center">
          Already have an account? <Link href="/login" className="underline">Sign in</Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;