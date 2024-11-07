"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../CustomFormField";
import Dialog from "@/components/Dialog";
import Image from "next/image"; 

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

const PatientForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const onSubmit = (values) => {
    console.log(values);
    setDialogOpen(true);
  };

  const handleVerify = () => {
    console.log("Verifying OTP:", otp);
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1>Hi there 👋</h1>
            <p className="text-dark-700">Get Started with Appointments.</p>
          </section>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="username"
            label="Full name"
            placeholder="Adrian Hajdin"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Image
                      src="/assets/icons/email.svg"
                      alt="Email Icon"
                      width={24} 
                      height={24}
                      className="absolute left-3"
                    />
                    <Input
                      placeholder="adrian@jsmastery.pr"
                      {...field}
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Image
                      src="/assets/icons/lead.svg"
                      alt="Phone Icon"
                      width={24} 
                      height={24} 
                      className="absolute left-3"
                    />
                    <Input
                      placeholder="+00 456-7890"
                      {...field}
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="btn-get-started" type="submit">
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
