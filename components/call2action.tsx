"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Contact } from "lucide-react";

interface Call2ActionProps {
  onClick?: () => void | undefined;
  title: string;
  className?: string;
  isDefault: boolean;
}

export default function Call2Action({
  title,
  className,
  onClick,
  isDefault = false,
}: Call2ActionProps) {
  return (
    <Button
      className={cn(
        "text-start font-bold group w-fit",
        isDefault
          ? "bg-foreground text-background"
          : "bg-background text-foreground",
        className
      )}
      onClick={onClick}
      variant={isDefault ? "default" : "outline"}
    >
      <span className=" text-balance max-w-[10ch]">{title}</span>
      {isDefault ? (
        <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-2 duration-300" />
      ) : (
        <Contact className="w-6 h-6 ml-2 group-hover:translate-x-2 duration-300" />
      )}
    </Button>
  );
}
