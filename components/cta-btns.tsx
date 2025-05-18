"use client";
import React from "react";
import { useSession } from "next-auth/react";

import { signIn } from "next-auth/react";
import Call2Action from "./call2action";
import { useRouter } from "next/navigation";

export default function CtaBtns() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="flex gap-4 max-[380px]:flex-col flex-row md:gap-8 ">
      <Call2Action
        title="Try Now"
        isDefault={true}
        onClick={() => {
          if (session) {
            router.push("/analyze");
          } else {
            signIn("google", { redirectTo: "/analyze" });
          }
        }}
      />
      <Call2Action
        onClick={() => {
          router.push("https://calendly.com/auroraorganic4u");
        }}
        title="Book Now"
        isDefault={false}
      />
    </div>
  );
}
