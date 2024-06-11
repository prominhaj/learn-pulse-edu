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
import { userValidation, userValidationStep2 } from '@/lib/FormValidation/users/userValidation';
import Step1 from './StepForm/Step1';
import Step2 from './StepForm/Step2';
import { createAccount } from '@/app/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignUpForm = ({ role }) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const formActionStep1 = async (formData) => {
    setError(null)
    try {
      const singUp = await userValidation(formData);
      if (singUp.errors) {
        setError(singUp.errors);
        return;
      }
      else if (singUp.success) {
        if (role === "student") {
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
        setUserData(singUp.data);
        setStep(step + 1);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const formActionStep2 = async (formData) => {
    setError(null)
    try {
      const userStep2 = await userValidationStep2(formData);
      if (userStep2.errors) {
        setError(userStep2.errors);
        return;
      }
      else if (userStep2.success) {
        setUserData({ ...userData, ...userStep2.data });
        setStep(step + 1);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log(userData);
  return (
    <Card className="relative max-w-sm mx-auto dark:shadow-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up {step === 2 && "- Step 2"}</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>

        {/* Multi Step Authentication */}
        {step === 1 && <Step1 formAction={formActionStep1} state={error} />}
        {step === 2 && <Step2 formAction={formActionStep2} state={error} />}


        <div className="mt-4 text-sm text-center">
          Already have an account? <Link href="/login" className="underline">Sign in</Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;