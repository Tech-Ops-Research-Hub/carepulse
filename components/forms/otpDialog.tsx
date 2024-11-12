import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

type formValues = z.infer<typeof FormSchema>

type InputOTPFormProps = {
  isOpen: boolean,
  onClose: (value: boolean) => void
  title: string
  description: string,
  onVerify: (data: formValues) => void
  loading: boolean
}

const InputOTPForm = ({ isOpen, onClose, title, description, onVerify, loading }: InputOTPFormProps) => {
  const form = useForm<formValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })

  useEffect(() => {
    form.setValue('otp', `${Math.floor(100000 + Math.random() * 900000)}`)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-300 shadow-md border-0 space-y-4">
        <DialogHeader className="space-y-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="shad-input-label">
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onVerify)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="w-fit mx-auto">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit"
              className="w-full" variant='default'>
              Verify {loading && <Loader2 className="ml-2 animate-spin h-5 w-5" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InputOTPForm;
