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
import Dialog from "@/components/Dialog";
import { useRouter } from "next/navigation";
import { FormFieldType } from "@/lib/constants";

const formSchema = z.object({
  username: z.string().min(2, {
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
      username: "",
      email: "",
      phone: "",
    },
  });

  const router = useRouter()

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const onSubmit = (values: formValues) => {
    console.log(values);
    setDialogOpen(true);

  };

  const handleVerify = () => {
    setDialogOpen(false);
    router.push('/patient/kyc')
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
            name="username"
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
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title="Verify OTP"
        otp={otp}
        setOtp={setOtp}
        handleVerify={handleVerify}
      />
    </div>
  );
};

export default PatientForm;
