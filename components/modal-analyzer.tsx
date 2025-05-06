"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import SkinAnalyzer from "./skin-analyzer";

export default function AnalyzePage() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  // On mount, check if user already consented
  useEffect(() => {
    const consent = localStorage.getItem("skin-analyzer-consent");
    setHasConsent(consent === "true");
  }, []);

  // While checking localStorage, don't render anything
  if (hasConsent === null) return null;

  // If already consented, show the analyzer
  if (hasConsent) {
    return (
      <div className="wrapper py-12">
        <SkinAnalyzer />
      </div>
    );
  }

  // Otherwise, show the consent form
  return (
    <div className=" flex items-center justify-center mt-24 ">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex items-center gap-4 pb-0">
          <div className="p-2 rounded-full text-red-600">
            <AlertTriangle size={24} />
          </div>
          <CardTitle>User Consent Required</CardTitle>
        </CardHeader>
        <CardDescription className="px-6 pt-2 text-muted-foreground">
          We need your permission to use your photo for AI-powered skin
          condition analysis. Your image is processed securely and only during
          this session.
        </CardDescription>
        <CardContent className="px-6 pt-4 space-y-4">
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Detects conditions like acne, dryness, and wrinkles.</li>
            <li>No data is stored permanently without your permission.</li>
            <li>
              You can withdraw consent at any time by clearing browser data.
            </li>
          </ul>
          <div className="flex items-start gap-2">
            <Checkbox
              id="consent-checkbox"
              checked={checked}
              onCheckedChange={(val) => setChecked(!!val)}
            />
            <Label
              htmlFor="consent-checkbox"
              className="text-sm text-muted-foreground"
            >
              I understand and agree to the use of my image for this analysis.
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 px-6 pb-6">
          <Button variant="outline" onClick={() => router.push("/browse/acne")}>
            Decline
          </Button>
          <Button
            disabled={!checked}
            onClick={() => {
              localStorage.setItem("skin-analyzer-consent", "true");
              setHasConsent(true);
            }}
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
