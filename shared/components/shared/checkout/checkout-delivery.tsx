"use client";

import { WhiteBlock } from "@/shared/components/shared";
import { FormInput, FormTextarea } from "@/shared/components/shared/form";

interface Props {
  title: string;
  className?: string;
}

export const CheckoutDelivery = ({ className, title }: Props) => {
  return (
    <WhiteBlock title={title} className={className}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" placeholder="Address" />
        <FormTextarea rows={5} name="comment" placeholder="Comment" />
      </div>
    </WhiteBlock>
  );
};
