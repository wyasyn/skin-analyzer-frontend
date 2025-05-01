"use client";

import Image from "next/image";
import { Button } from "./ui/button";

interface Call2ActionProps {
  onClick?: () => void | undefined;
  title: string;
  icon: string;
  isDefault: boolean;
}

export default function Call2Action({
  title,
  icon,
  onClick,
  isDefault = false,
}: Call2ActionProps) {
  return (
    <Button
      className="text-start w-fit"
      onClick={onClick}
      variant={isDefault ? "default" : "outline"}
    >
      <span className=" text-balance max-w-[10ch]">{title}</span>
      <Image
        src={icon}
        alt={title}
        width={30}
        height={30}
        className="object-contain"
      />
    </Button>
  );
}
