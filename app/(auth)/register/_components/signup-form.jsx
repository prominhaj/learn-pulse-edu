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

  const handleFormAction = async (formData, validationFn, nextStepFn) => {
    setError(null);
    try {
      const validationResult = await validationFn(formData);
      if (validationResult.errors) {
        setError(validationResult.errors);
        return;
      }
      if (validationResult.success) {
        if (nextStepFn) {
          const updatedUserData = await nextStepFn(validationResult.data);
          setUserData((prevUserData) => ({ ...prevUserData, ...updatedUserData }));
        } else {
          const user = validationResult.data;
          if (role === "student") {
            const createUser = await createAccount(user);
            if (createUser.success) {
              toast.success(createUser.message);
              router.push('/login');
            } else {
              toast.error(createUser.message);
            }
          }
          setUserData(user);
        }
        setStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formActionStep1 = async (formData) => {
    return handleFormAction(formData, userValidation, async (data) => {
      const { firstName, lastName, email, password } = data;
      const user = { firstName, lastName, email, password };
      return user;
    });
  };

  const formActionStep2 = async (formData) => {
    return handleFormAction(formData, userValidationStep2, async (data) => {
      return data;
    });
  };

  const formActionStep3 = async (formData) => {
    return handleFormAction(formData, userValidationStep3, async (data) => {
      const fullUserData = { ...userData, socialMedia: { ...data } };
      const photoData = new FormData();
      photoData.append("profilePicture", fullUserData.profilePicture);
      const newUserCreate = await createAccount({ ...fullUserData, profilePicture: null }, photoData);
      if (newUserCreate.success) {
        toast.success(newUserCreate.message);
        router.push('/login');
      } else {
        toast.error(newUserCreate.message);
      }
      return {};
    });
  };


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