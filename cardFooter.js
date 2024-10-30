import { ReactNode } from "react";

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div className={`p-4 border-t border-gray-200 ${className}`}>
      {children}</div>
    );
};
