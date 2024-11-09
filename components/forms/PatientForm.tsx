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
import { FormFieldType } from "@/lib/constants";
import InputOTPForm from "./otpDialog";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

type formValues = z.infer<typeof formSchema>

const PatientForm = () => {
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const onSubmit = (values: formValues) => {
    console.log(values);
    setDialogOpen(true);
  };

  const handleVerify = (data: { otp: string }) => {
    setDialogOpen(false);
    router.push(`/patient/kyc?name=${form.getValues('name')}&email=${form.getValues('email')}&phoneNumber=${form.getValues('phone')}`)
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
            Get Started
          </Button>
        </form>
      </Form>
      <InputOTPForm
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title="Verify OTP"
        description="Please enter the OTP sent to your registered mobile number."
        onVerify={handleVerify}
      />
    </div>
  );
};

export default PatientForm;
