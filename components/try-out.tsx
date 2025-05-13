"use client";
import React from "react";
import Call2Action from "./call2action";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TryOut() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Call2Action
      title="Try Now"
      isDefault={true}
      className="mt-10 md:mt-20 mx-auto flex items-center bg-background border text-foreground"
      onClick={() => {
        if (session) {
          router.push("/analyze");
        } else {
          signIn("google", { redirectTo: "/analyze" });
        }
      }}
    />
  );
}
