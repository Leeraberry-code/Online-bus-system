import { cn } from "../../../utils/helper"; // Optional: utility function for conditional classes
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const baseStyles =
      "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring transition";

    const variants = {
      primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
      secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
