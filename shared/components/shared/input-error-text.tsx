import { cn } from "@/shared/lib/utils";

interface Props {
  text?: string;
  className?: string;
}

export const InputErrorText = ({ text, className }: Props) => {
  return <p className={cn(className, "text-sm text-red-500")}>{text}</p>;
};
