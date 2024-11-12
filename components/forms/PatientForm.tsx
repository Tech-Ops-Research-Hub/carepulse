"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form
} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType, PatientCollectionId, phoneNumberRegex } from "@/lib/constants";
import InputOTPForm from "./otpDialog";
import { useRouter } from "next/navigation";
import { useAuthCtx } from "@/context/authContext";
import { listDocuments } from "@/actions/dbManager";
import { Query } from "appwrite";
import { Loader2 } from "lucide-react";
import { PatientDasboard, PatientOnboarding } from "@/lib/routes";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }).regex(phoneNumberRegex, "Invalid phone number"),
});

type formValues = z.infer<typeof formSchema>

const PatientForm = () => {
  const { profileData, setProfileData } = useAuthCtx();
	const { toast } = useToast();

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profileData.name || '',
      email: profileData.email || "",
      phone: profileData.phone || "",
    },
  });

  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const onSubmit = (values: formValues) => {
    setProfileData(values)
    // generate otp for the specified phone number / email
    setDialogOpen(true);
  };

  const handleVerify = async (data: { otp: string }) => {
    setLoading(true)
    // validate otp, and check if profile exists with this email,
    // if profile exists - direct to dashboard, if not, redirect to / patient / kyc

    // validate otp
    console.log({ data });

    const email = form.getValues('email')
    await listDocuments(PatientCollectionId, [Query.equal('email', email)]).then((value) => {
      console.log({value});
      if (value.total > 0) {
        // redirect to dashboard
        router.push(PatientDasboard)
        return
      }
      router.push(PatientOnboarding)
      setDialogOpen(false);
    }).catch((err) => {
      console.log("fetch profile err: ", err);
      toast({
        variant: 'destructive',
        description: 'Failed to fetch profile. Try again later!'
      })
    }).finally(() => setLoading(false))
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 grid gap-2"
        >
          <section className="space-y-4">
            <h1 className="text-2xl font-bold">Hi there 👋</h1>
            <p className="text-dark-700 text-sm">Get Started with Appointments.</p>
          </section>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="abc@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="0712345678"
            iconSrc="/assets/icons/lead.svg"
            iconAlt="phone"
          />
          <Button type="submit" className="w-full px-4 font-bold text-base">
            Get Started {loading && <Loader2 className="ml-2 animate-spin h-5 w-5" />}
          </Button>
        </form>
      </Form>
      <InputOTPForm
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title="Verify OTP"
        description="Please enter the OTP sent to your registered mobile number."
        onVerify={handleVerify}
        loading={loading}
      />
    </div>
  );
};

export default PatientForm;
