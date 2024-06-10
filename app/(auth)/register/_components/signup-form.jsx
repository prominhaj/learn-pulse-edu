'use client';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createAccount } from '@/app/actions';
import SubmitButton from '@/components/globals/SubmitButton/SubmitButton';
import FormControl from './FormControl';

const SignUpForm = () => {
  const [state, formAction] = useFormState(createAccount, undefined);

  return (
    <Card className="max-w-sm mx-auto dark:shadow-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="grid items-start grid-cols-1 gap-4 sm:grid-cols-2">
            <FormControl id="first-name" name="firstName" label="First name" placeholder="Jon" errors={state?.errors?.firstName} />
            <FormControl id="last-name" name="lastName" label="Last name" placeholder="Robinson" errors={state?.errors?.lastName} />
          </div>
          <FormControl id="email" name="email" label="Email" type="email" placeholder="m@example.com" errors={state?.errors?.email} />
          <FormControl id="password" name="password" label="Password" type="password" placeholder="••••••••" errors={state?.errors?.password} />
          <FormControl id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" errors={state?.errors?.confirmPassword} />
          <SubmitButton className="w-full">Create an account</SubmitButton>
        </form>
        <div className="mt-4 text-sm text-center">
          Already have an account? <Link href="/login" className="underline">Sign in</Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
