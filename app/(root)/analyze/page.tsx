import { auth } from "@/auth";
import ModalAnalyzer from "@/components/modal-analyzer";
import NotAuthenticatedPage from "@/components/un-authenticated";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Analyze skin | Aurora Skin Analyzer – AI-Powered Skin Condition Detection & Care",
};

export default async function page() {
  const session = await auth();
  if (!session) return <NotAuthenticatedPage />;
  return (
    <div className="pt-14 md:pt-24 pb-16 md:pb-40">
      <ModalAnalyzer />
    </div>
  );
}
