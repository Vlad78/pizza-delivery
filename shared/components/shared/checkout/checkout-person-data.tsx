import { FormInput } from "../form";
import { WhiteBlock } from "../white-block";

interface Props {
  title: string;
  className?: string;
}

export const CheckoutPersonData = ({ className, title }: Props) => {
  return (
    <WhiteBlock title={title} className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput placeholder="First name" name={"firstName"} />
        <FormInput placeholder="Last name" name={"lastName"} />
        <FormInput placeholder="Email" name={"email"} />
        <FormInput placeholder="Phone" name={"phone"} />
      </div>
    </WhiteBlock>
  );
};
