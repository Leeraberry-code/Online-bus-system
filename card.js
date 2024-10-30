import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`bg-white shadow-md rounded-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
