import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface CardProps {
  label: string;
  content: string | number;
  icon?: React.ReactNode;
  className?: string;
  href?: string;
}

const Card: React.FC<CardProps> = ({
  label,
  content,
  icon,
  className,
  href,
}) => {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "flex rounded-lg bg-primary text-background p-4 shadow-md",
          className
        )}
      >
        {icon && <div className="icon">{icon}</div>}
        <div className="flex flex-col">
          <span className="font-medium text-sm">{label}</span>
          <span className="text-2xl font-black">{content}</span>
        </div>
      </Link>
    );
  }
  return (
    <div
      className={cn(
        "flex rounded-lg bg-primary text-background p-4 shadow-md",
        className
      )}
    >
      {icon && <div className="icon">{icon}</div>}
      <div className="flex flex-col">
        <span className="font-medium text-sm">{label}</span>
        <span className="text-2xl font-black">{content}</span>
      </div>
    </div>
  );
};

const HomeCard: React.FC<CardProps> = ({
  label,
  content,
  icon,
  className,
  href,
}) => {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "flex rounded-lg p-4 px-10 gap-5 sm:gap-2 lg:gap-5 items-center shadow-md hover:scale-103 duration-300 transition-transform ease-in-out justify-center max-w-70 w-full",
          className
        )}
      >
        {icon && <div className="icon">{icon}</div>}
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-2xl lg:text-4xl font-black">
            {content}
          </span>
          <span className="text-md md:text-sm lg:text-md font-extrabold uppercase">
            {label}
          </span>
        </div>
      </Link>
    );
  }
  return (
    <div
      className={cn(
        "flex rounded-lg p-4 px-10 gap-5 sm:gap-2 lg:gap-5 items-center shadow-md hover:scale-102 transition-transform ease-in-out justify-center max-w-70 w-full",
        className
      )}
    >
      {icon && <div className="icon">{icon}</div>}
      <div className="flex flex-col items-center">
        <span className="text-4xl font-black">{content}</span>
        <span className="font-extrabold uppercase">{label}</span>
      </div>
    </div>
  );
};

export { Card, HomeCard };
