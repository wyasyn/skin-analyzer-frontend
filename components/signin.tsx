"use client";

import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);
    try {
      signIn("google", { redirectTo: "/analyze" });
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      size={"sm"}
      data-loading={isLoading || undefined}
      className="group relative disabled:opacity-100"
    >
      <span
        className={cn(
          "group-data-loading:text-transparent",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      >
        Sign In
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircleIcon
            className="animate-spin"
            size={16}
            aria-hidden="true"
          />
        </div>
      )}
    </Button>
  );
}
