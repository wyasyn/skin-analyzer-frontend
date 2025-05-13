"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Link href="/">
      <img
        src={theme === "light" ? "/logo2.png" : "/logo-white.png"}
        alt="Logo"
        className="h-16 w-auto object-contain"
      />
    </Link>
  );
}
