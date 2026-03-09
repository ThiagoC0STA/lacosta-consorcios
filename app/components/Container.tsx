import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "8xl" | "full";
  padding?: boolean;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "7xl": "max-w-7xl",
  "8xl": "max-w-[1536px]",
  full: "max-w-full",
};

export default function Container({
  children,
  className,
  maxWidth = "7xl",
  padding = true,
}: ContainerProps) {
  return (
    <div
      className={cn(
        maxWidthClasses[maxWidth],
        "mx-auto",
        padding && "px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}

