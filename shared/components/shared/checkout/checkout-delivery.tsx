import { WhiteBlock } from "@/shared/components/shared";
import { FormInput } from "@/shared/components/shared/form";
import { Textarea } from "@/shared/components/ui";

interface Props {
  title: string;
  className?: string;
}

export const CheckoutDelivery = ({ className, title }: Props) => {
  return (
    <WhiteBlock title={title} className={className}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" placeholder="Address" />
        <Textarea
          rows={5}
          name="comment"
          placeholder="Comment"
          className="text-base"
        />
      </div>
    </WhiteBlock>
  );
};
