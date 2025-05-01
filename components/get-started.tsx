"use client";
import { SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GetStarted() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="w-full max-w-[300px] mx-auto my-8"
      onClick={() => {
        if (session) {
          router.push("/analyze");
        } else {
          signIn("google", { redirectTo: "/analyze" });
        }
      }}
    >
      Get Started
      <SparklesIcon className="-me-1 opacity-60" size={16} aria-hidden="true" />
    </Button>
  );
}

export function AnalyzeLink() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Button
      variant="link"
      className="w-full max-w-[300px] mx-auto my-8 text-muted-foreground"
      onClick={() => {
        if (session) {
          router.push("/analyze");
        } else {
          signIn("google", { redirectTo: "/analyze" });
        }
      }}
    >
      Skin Analysis
    </Button>
  );
}
