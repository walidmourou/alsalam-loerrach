import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded transition-colors font-medium",
        {
          "bg-[#009245] text-white hover:bg-[#009245]/90":
            variant === "primary",
          "bg-gray-100 text-[#262262] hover:bg-gray-200":
            variant === "secondary",
          "border border-[#262262] text-[#262262] hover:bg-[#262262]/10":
            variant === "outline",
          "px-3 py-1 text-sm": size === "sm",
          "px-4 py-2": size === "md",
          "px-6 py-3 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
}
