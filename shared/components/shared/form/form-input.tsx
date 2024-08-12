import { useFormContext } from "react-hook-form";

import {
  ClearButton,
  InputErrorText,
  RequiredSymbol,
} from "@/shared/components/shared";
import { CheckoutSchema } from "@/shared/components/shared/checkout/schemas/checkout-schema";
import { Input } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";

type Props = {
  name: keyof CheckoutSchema;
  label?: string;
  required?: boolean;
  errorText?: string;
  className?: string;
} & React.ComponentProps<"input">;

export const FormInput = ({
  name,
  label,
  required,
  className,
  errorText,
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const onClickClear = () => {
    setValue(name, "");
  };

  return (
    <div className={cn(className, "text-base")}>
      {label && (
        <label htmlFor={name} className="font-medium mb-2 ">
          {label} {required && <RequiredSymbol />}{" "}
        </label>
      )}

      <div className="relative">
        <Input
          required={required}
          className="h-12 text-md"
          {...props}
          {...register(name)}
        />

        <ClearButton onClick={onClickClear} />
      </div>

      <InputErrorText
        text={errorText || (errors?.[name]?.message as string)}
        className="mt-2"
      />
    </div>
  );
};
