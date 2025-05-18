import { PrivacyPolicyPage } from "@/components/legal";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Privacy Policy | Aurora Skin Analyzer – AI-Powered Skin Condition Detection & Care",
};

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}
