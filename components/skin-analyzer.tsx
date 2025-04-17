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
import {
  validateSkinPercentage,
  isImageBelowSizeLimit,
  compressImage,
} from "@/lib/image-validation";
import { PredictionFailed, PredictionResponse } from "@/types";

type AnalysisStatus =
  | "idle"
  | "validating"
  | "uploading"
  | "success"
  | "error"
  | "compressing";

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
      // Check image size
      const maxSizeKB = 700;
      let processedImage = imageData;

      if (!isImageBelowSizeLimit(imageData, maxSizeKB)) {
        setStatus("compressing");
        // Compress the image to be below the size limit
        processedImage = await compressImage(imageData, maxSizeKB);
      }

      // // Validate that the image contains at least 10% skin
      // const isValid = await validateSkinPercentage(processedImage, 10);

      // if (!isValid) {
      //   setStatus("error");
      //   setErrorMessage(
      //     "The image doesn't contain enough skin (minimum 10% required). Please try again."
      //   );
      //   return;
      // }

      setCapturedImage(processedImage);
      await analyzeSkin(processedImage);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        "An error occurred while processing the image. Please try again."
      );
      console.error(error);
    }
  };

  const analyzeSkin = async (imageData: string) => {
    setStatus("uploading");

    try {
      // Convert base64 to Blob
      const byteString = atob(imageData.split(",")[1]);
      const mimeString = imageData.split(",")[0].split(":")[1].split(";")[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "skin-image.jpg", { type: mimeString });

      // Create form data
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${baseUrl}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if ("detail" in data) {
          throw new Error(data.detail);
        } else {
          throw new Error("Failed to analyze skin condition.");
        }
      }

      if ("predicted_condition" in data && "confidence" in data) {
        setSkinResults(data as PredictionResponse);
        setStatus("success");

        toast.success("Skin analysis complete!", {
          description: `Condition: ${data.predicted_condition} (Confidence: ${(
            data.confidence * 100
          ).toFixed(1)}%)`,
        });
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error: any) {
      setStatus("error");
      const message = error.message || "An unexpected error occurred.";
      setErrorMessage(message);

      toast.error("Analysis Failed", {
        description: message,
      });

      console.error("Skin analysis error:", error);
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
          Take a photo or upload an image of your skin for analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" && skinResults ? (
          <SkinResults
            capturedImage={capturedImage!}
            skinCondition={skinResults}
            onReset={resetAnalysis}
          />
        ) : (
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="camera">
                <Camera className="mr-2 h-4 w-4" />
                Camera
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="mt-0">
              <WebcamCapture
                onCapture={handleImageCapture}
                disabled={status !== "idle"}
              />
            </TabsContent>

            <TabsContent value="upload" className="mt-0">
              <ImageUploader
                onUpload={handleImageCapture}
                disabled={status !== "idle"}
              />
            </TabsContent>
          </Tabs>
        )}

        {status === "validating" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Validating image...</p>
          </div>
        )}

        {status === "compressing" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Compressing image to reduce size...
            </p>
          </div>
        )}

        {status === "uploading" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Analyzing skin condition...
            </p>
          </div>
        )}

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
