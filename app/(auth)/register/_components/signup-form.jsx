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
import { userValidation, userValidationStep2, userValidationStep3 } from '@/lib/FormValidation/users/userValidation';
import Step1 from './StepForm/Step1';
import Step2 from './StepForm/Step2';
import Step3 from './StepForm/Step3';
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
        const { firstName, lastName, email, password } = singUp.data;
        const user = {
          firstName, lastName, email, password
        }
        if (role === "student") {
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
        setUserData(user);
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
      toast.error(error.message);
    }
  }

  const formActionStep3 = async (formData) => {
    setError(null)
    try {
      const userStep3 = await userValidationStep3(formData);
      if (userStep3.errors) {
        setError(userStep3.errors);
        return;
      }
      else if (userStep3.success) {
        const fullUserData = { ...userData, socialMedia: { ...userStep3.data } };
        const photoData = new FormData();
        photoData.append("profilePicture", fullUserData.profilePicture);
        const newUserCreate = await createAccount({ ...fullUserData, profilePicture: null }, photoData);
        if (!newUserCreate.success) {
          toast.error(newUserCreate.message)
          return;
        }
        else if (newUserCreate.success) {
          toast.success(newUserCreate.message)
          router.push('/login')
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Card className="relative max-w-sm mx-auto dark:shadow-gray-800">
      <CardHeader>
        <CardTitle className="text-xl">
          {step === 2 ? "Sign Up - Step 2" : step === 3 ? "Social Media - Step 3" : "Sign Up"}
        </CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>

        {/* Multi Step Authentication */}
        {step === 1 && <Step1 role={role} formAction={formActionStep1} state={error} />}
        {step === 2 && <Step2 formAction={formActionStep2} state={error} />}
        {step === 3 && <Step3 formAction={formActionStep3} state={error} />}


        <div className="mt-4 text-sm text-center">
          Already have an account? <Link href="/login" className="underline">Sign in</Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;