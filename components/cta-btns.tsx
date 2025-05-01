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
    <div className="flex flex-col gap-4 mt-4 md:flex-row md:gap-8 pt-8 ">
      <Call2Action
        title="Image Diagnostic"
        icon="/image.png"
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
        title="Online Consultancy"
        icon="/camera.png"
        isDefault={false}
      />
    </div>
  );
}
