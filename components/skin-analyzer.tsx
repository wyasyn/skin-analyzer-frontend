"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Upload, Loader2, RefreshCw } from "lucide-react";
import WebcamCapture from "./webcam-capture";
import ImageUploader from "./image-uploader";
import SkinResults from "./skin-results";
import { isImageBelowSizeLimit, compressImage } from "@/lib/image-validation";
import { PredictionResponse } from "@/types";

type AnalysisStatus =
  | "idle"
  | "validating"
  | "compressing"
  | "uploading"
  | "success"
  | "error";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function SkinAnalyzer() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [skinResults, setSkinResults] = useState<PredictionResponse | null>(
    null
  );

  const handleImageCapture = async (imageData: string) => {
    setStatus("validating");
    setErrorMessage("");

    try {
      const maxSizeKB = 700;
      let processed = imageData;

      if (!isImageBelowSizeLimit(imageData, maxSizeKB)) {
        setStatus("compressing");
        processed = await compressImage(imageData, maxSizeKB);
      }

      setCapturedImage(processed);
      await analyzeSkin(processed);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        "An error occurred while processing the image. Please try again."
      );
    }
  };

  const analyzeSkin = async (imageData: string) => {
    setStatus("uploading");

    try {
      // build a File from base64
      const [meta, b64] = imageData.split(",");
      const mime = meta.match(/:(.*?);/)![1];
      const bytes = atob(b64);
      const buf = new ArrayBuffer(bytes.length);
      const arr = new Uint8Array(buf);
      for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
      const blob = new Blob([buf], { type: mime });
      const file = new File([blob], "skin.jpg", { type: mime });

      const form = new FormData();
      form.append("file", file);

      const res = await fetch(`${baseUrl}/predict`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Analysis failed.");

      setSkinResults(data as PredictionResponse);
      setStatus("success");
      toast.success("Analysis complete!", {
        description: `Condition: ${
          data.predicted_condition
        } — ${data.confidence.toFixed(1)}%`,
      });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Unexpected error.");
      toast.error("Analysis failed", { description: errorMessage });
    }
  };

  const resetAnalysis = () => {
    setCapturedImage(null);
    setSkinResults(null);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Skin Analysis</CardTitle>
        <CardDescription>
          Take or upload a photo of your skin for AI-powered analysis
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* SUCCESS */}
        {status === "success" && skinResults && (
          <SkinResults
            capturedImage={capturedImage!}
            skinCondition={skinResults}
            onReset={resetAnalysis}
          />
        )}

        {/* IDLE */}
        {status === "idle" && !skinResults && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT: capture/upload */}
            <div className="flex-1">
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="camera">
                    <Camera className="mr-2 h-4 w-4" />
                    Camera
                  </TabsTrigger>
                  <TabsTrigger value="upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="camera">
                  <WebcamCapture
                    onCapture={handleImageCapture}
                    disabled={status !== "idle"}
                  />
                </TabsContent>
                <TabsContent value="upload">
                  <ImageUploader
                    onUpload={handleImageCapture}
                    disabled={status !== "idle"}
                  />
                </TabsContent>
              </Tabs>
            </div>
            {/* RIGHT: instructions */}
            <div className="flex-1 p-6 rounded-lg border ">
              <h4 className="text-lg font-semibold mb-3">
                Tips for a Great Photo
              </h4>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ">
                <li>Use natural or soft lighting—no harsh shadows.</li>
                <li>Hold the camera ~6–12 inches from the area of interest.</li>
                <li>Keep the device steady—use both hands or a stand.</li>
                <li>Ensure skin is clean and makeup-free.</li>
                <li>Clean the lens for the sharpest image.</li>
              </ul>
            </div>
          </div>
        )}

        {/* VALIDATING / COMPRESSING / UPLOADING */}
        {status === "validating" && (
          <LoadingState message="Validating image..." />
        )}
        {status === "compressing" && (
          <LoadingState message="Compressing image..." />
        )}
        {status === "uploading" && (
          <LoadingState message="Analyzing skin condition..." />
        )}

        {/* ERROR */}
        {status === "error" && (
          <div className="bg-destructive/10 p-4 rounded-md mt-4">
            <p className="text-destructive text-sm">{errorMessage}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={resetAnalysis}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper loader component
function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
