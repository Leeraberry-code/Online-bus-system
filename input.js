import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
