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
          "flex rounded-lg bg-primary text-background p-4 shadow-md hover:scale-102 transition-transform ease-in-out",
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
        "flex rounded-lg bg-primary text-background p-4 shadow-md hover:scale-102 transition-transform ease-in-out",
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
          "flex rounded-lg p-4 px-10 gap-8 items-center shadow-md hover:scale-102 transition-transform ease-in-out justify-center",
          className
        )}
      >
        {icon && <div className="icon">{icon}</div>}
        <div className="flex flex-col items-center">
          <span className="text-4xl font-black">{content}</span>
          <span className="font-extrabold uppercase">{label}</span>
        </div>
      </Link>
    );
  }
  return (
    <div
      className={cn(
        "flex rounded-lg p-4 px-10 gap-8 items-center shadow-md hover:scale-102 transition-transform ease-in-out justify-center",
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
