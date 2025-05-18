import { TermsOfUsePage } from "@/components/legal";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Terms of use | Aurora Skin Analyzer – AI-Powered Skin Condition Detection & Care",
};

export default function TermsOfUse() {
  return <TermsOfUsePage />;
}
