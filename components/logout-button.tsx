"use client";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

export default function LogoutButton() {
  return (
    <DropdownMenuItem onClick={() => signOut({ redirectTo: "/" })}>
      <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
      <span>Logout</span>
    </DropdownMenuItem>
  );
}
