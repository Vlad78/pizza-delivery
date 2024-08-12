import { X } from "lucide-react";

import { cn } from "@/shared/lib";

interface Props {
  onClick: () => void;
  className?: string;
}

export const ClearButton = ({ onClick, className }: Props) => {
  return (
    <button
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer",
        className
      )}
      onClick={onClick}
      type="button"
    >
      <X className="h-5 w-5" />
    </button>
  );
};
