"use client";

import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CircleAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import SkinAnalyzer from "./skin-analyzer";

export default function ModalAnalyzer() {
  const [consentOpen, setConsentOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const hasConsented = localStorage.getItem("skin-analyzer-consent");
    if (!hasConsented) {
      setConsentOpen(true);
    }
  }, []);

  const handleConsentCancel = () => {
    router.push("/");
  };

  const handleConsentAllow = () => {
    localStorage.setItem("skin-analyzer-consent", "true");
    setConsentOpen(false);
  };
  return (
    <>
      <AlertDialog open={consentOpen} onOpenChange={setConsentOpen}>
        <AlertDialogContent>
          <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <CircleAlertIcon className="opacity-80" size={16} />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle>Image Use Consent</AlertDialogTitle>
              <AlertDialogDescription>
                Do you agree to allow us to use your image for AI-based skin
                analysis? Your image will only be used for this session.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleConsentCancel}>
              Decline
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConsentAllow}>
              Allow
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {!consentOpen ? (
        <div className="wrapper py-12">
          <SkinAnalyzer />
        </div>
      ) : null}
    </>
  );
}
