'use client'

import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { genderList, identificationTypes, phoneNumberRegex } from '@/lib/constants';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/datepicker';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import FileUpload from '@/components/ui/fileupload';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
	fullName: z.string(),
	email: z.string().email(),
	phoneNumber: z.string().regex(phoneNumberRegex, "Invalid phone number"),
	dob: z.coerce.date(),
	gender: z.enum(["Male", "Female", "Other"], {
    required_error: "You need to select a gender.",
  }),
	address: z.string(),
	occupation: z.string(),
	emergencyName: z.string(),
	emergencyPhone: z.string().regex(phoneNumberRegex, "Invalid phone number"),
	physician: z.string(),
	policyProvider: z.string(),
	policyNumber: z.string(),
	allergies: z.string(),
	currentMedications: z.string(),
	familyMedicalHistory: z.string().optional(),
	medicalHistory: z.string().optional(),
	idType: z.string(),
	idNumber: z.string(),
	idFileUrl: z.string(),
	treatmentConsent: z.boolean(),
	informationConsent: z.boolean(),
	privacyConsent: z.boolean(),
});

type formValues = z.infer<typeof formSchema>

const PatientOnboardingPage = () => {
	const form = useForm<formValues>({
		resolver: zodResolver(formSchema)
	});

	const allowedFiles = {
    'image/png': ['.png'],
    'image/jpg': ['.jpg'],
    'image/jpeg': ['.jpeg'],
    'image/svg': ['.svg'],
  }


	const onSubmit = async (values: formValues) => {
		console.log({ values });
	}

	return (
		<div className='flex gap-10 justify-between'>
			<div className='grid gap-5 lg:w-2/3'>
				<div>
					<h1 className='text-2xl md:text-4xl font-bold'>Welcome 👋</h1>
					<p className=''>Let us know more about yourself.</p>
				</div>
				<h1 className='text-2xl md:text-4xl font-bold'>Personal Information</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid md:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }) => (
								<FormItem className='md:col-span-2'>
									<FormLabel>
										Full Name
									</FormLabel>
									<Input {...field} placeholder='ex: Adam' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Email Address
									</FormLabel>
									<Input {...field} placeholder='abc@gmail.com' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phoneNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Phone Number
									</FormLabel>
									<Input {...field} type='tel' placeholder='ex: 0712345678' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="dob"
							render={({ field }) => (
								<FormItem className=''>
									<FormLabel>
										Date of Birth
									</FormLabel>
									<DatePicker date={field.value} setDate={field.onChange} placeholder='Select your birth date' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-wrap justify-between"
										>
											{
												genderList.map((el) => (
													<FormItem key={el.value} className="flex items-center space-x-3 space-y-0 border p-1 px-3 border-dashed rounded-md">
														<FormControl>
															<RadioGroupItem value={el.value} />
														</FormControl>
														<FormLabel className="font-normal text-lg cursor-pointer">
															{el.label}
														</FormLabel>
													</FormItem>
												))
											}
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Address
									</FormLabel>
									<Input {...field} placeholder='ex: off Uhuru highway' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="occupation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Occupation
									</FormLabel>
									<Input {...field} placeholder='ex: Software Developer' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="emergencyName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Emergency Contact Name
									</FormLabel>
									<Input {...field} placeholder="Guardian's name" />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="emergencyPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Emergency Phone Number
									</FormLabel>
									<Input {...field} placeholder='ex: 0712345678' type='tel' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='md:col-span-2 py-4'>
							<p className='text-2xl md:text-4xlfont-bold'>Medical Information</p>
						</div>
						<FormField
							control={form.control}
							name="physician"
							render={({ field }) => (
								<FormItem className="md:col-span-2">
									<FormLabel>
										Primary Care Physician
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										{...field}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select an option" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className=''>
											{genderList.map((el) => {
												return (
													<SelectItem key={el.value} value={el.value}>
														{el.label}
													</SelectItem>
												)
											})}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="policyProvider"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Insurance Provider
									</FormLabel>
									<Input {...field} placeholder='ex: Britam' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="policyNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Insurance Policy Number
									</FormLabel>
									<Input {...field} placeholder='ex: ABC1234' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="allergies"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Allergies
									</FormLabel>
									<Textarea {...field} placeholder='ex: Peanuts, Penicillin, Pollen' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="currentMedications"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Current Medications
									</FormLabel>
									<Textarea {...field} placeholder='ex: Ibuprofen 200mg, Lexothyroxine 50mcg' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="familyMedicalHistory"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Family Medical History (if relevant)
									</FormLabel>
									<Textarea {...field} placeholder='ex: Mother had breast cancer' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="medicalHistory"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Past Medical History
									</FormLabel>
									<Textarea {...field} placeholder='ex: Asthma diagnosis in childhood' />
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='md:col-span-2 py-4'>
							<p className='text-2xl md:text-4xl font-bold'>Identification and Verification</p>
						</div>
						<FormField
							control={form.control}
							name="idType"
							render={({ field }) => (
								<FormItem className="md:col-span-2">
									<FormLabel>
										Identification Type
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										{...field}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select an option" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className=''>
											{identificationTypes.map((el) => {
												return (
													<SelectItem key={el.value} value={el.value}>
														{el.label}
													</SelectItem>
												)
											})}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="idNumber"
							render={({ field }) => (
								<FormItem className='md:col-span-2'>
									<FormLabel>
										Identification Number
									</FormLabel>
									<Input {...field} placeholder='ex: ABC1234' />
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="idFileUrl"
							render={({ field }) => (
								<FormItem className='md:col-span-2'>
									<FormLabel>
										Scanned copy of identification document
									</FormLabel>
									<FileUpload
										fileUrl={field.value}
										onChange={field.onChange}
										allowFiles={allowedFiles}
										description='SVG, PNG, JPG (max. 800x400px)'
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='md:col-span-2 py-4'>
							<p className='text-2xl md:text-4xl font-bold'>Consent and Privacy</p>
						</div>
						<FormField
							control={form.control}
							name="treatmentConsent"
							render={({ field }) => (
								<FormItem className='flex items-center gap-3 accent-blue-900 space-y-0 md:col-span-2'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											className='accent-blue-600 p-2'
										/>
									</FormControl>
									<FormLabel className='text-base'>
										I consent to receive treatment for my health condition
									</FormLabel>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="informationConsent"
							render={({ field }) => (
								<FormItem className='flex items-center gap-3 space-y-0 md:col-span-2'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											className='accent-blue-600 p-2'
										/>
									</FormControl>
									<FormLabel className='text-base'>
										I consent to the use and disclosure of my health information for treatment purposes.
									</FormLabel>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="privacyConsent"
							render={({ field }) => (
								<FormItem className='flex items-center gap-3 space-y-0 md:col-span-2'>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											className='accent-blue-600 p-2'
										/>
									</FormControl>
									<FormLabel className='text-base'>
										I acknowledge that I have reviewed and agree to the privacy policy.
									</FormLabel>
								</FormItem>
							)}
						/>
						<Button
							className='bg-primary md:col-span-2'
							variant='default'
							type='submit'>
							Submit
						</Button>

					</form>
				</Form>
			</div>
			<div className='absolute top-0 right-0 max-h-screen lg:flex hidden w-96 h-full'> 
				<div className='relative h-full w-full'>
					<Image
						src='/assets/images/Illustration.png'
						alt=''
						fill
						className='object-contain rounded-md'
					/>
				</div>
			</div>
		</div>
	);
};

export default PatientOnboardingPage