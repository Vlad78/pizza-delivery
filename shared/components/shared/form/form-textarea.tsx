"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import { ClearButton } from "@/shared/components/shared";
import { Textarea } from "@/shared/components/ui/";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  errorText?: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<Props> = ({
  className,
  name,
  label,
  errorText,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const onClickClear = () => {
    setValue(name, "");
  };

  return (
    <div className={className}>
      <p className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...props} />

        <ClearButton onClick={onClickClear} />
      </div>

      <p className="text-red-500 text-sm mt-2">
        {errorText || (errors[name]?.message as string)}
      </p>
    </div>
  );
};
