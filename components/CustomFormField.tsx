
'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import {Control} from "react-hook-form"
  import Image from 'next/image';
import { FormFieldType } from "@/lib/constants";
import { Textarea } from "./ui/textarea";


  interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType
    name: string,
    label?:string,
    placeholder?:string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    className?: string
    renderSkeleton?:(field:any)=> React.ReactNode,
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder, } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className='ml-2'
            />

          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-input border-0 resize-none min-h-24"
          />
        </FormControl>
      );
  
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, className, disabled } = props;

  return (
    <FormField
      disabled={disabled || false}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className='shad-input-label'>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="sha-error" />
        </FormItem>
      )}
    />
  )
};

export default CustomFormField
