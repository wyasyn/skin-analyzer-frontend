"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, Loader2, RefreshCw } from "lucide-react"
import WebcamCapture from "./webcam-capture"
import ImageUploader from "./image-uploader"
import SkinResults from "./skin-results"
import { validateSkinPercentage, isImageBelowSizeLimit, compressImage } from "@/lib/image-validation"

type AnalysisStatus = "idle" | "validating" | "uploading" | "success" | "error" | "compressing"

interface SkinCondition {
  condition: string
  description: string
  severity: string
  recommendedProducts: Product[]
}

interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  forConditions: string[]
}

export default function SkinAnalyzer() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [status, setStatus] = useState<AnalysisStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [skinResults, setSkinResults] = useState<SkinCondition | null>(null)

  const handleImageCapture = async (imageData: string) => {
    setStatus("validating")
    setErrorMessage("")

    try {
      // Check image size
      const maxSizeKB = 700
      let processedImage = imageData

      if (!isImageBelowSizeLimit(imageData, maxSizeKB)) {
        setStatus("compressing")
        // Compress the image to be below the size limit
        processedImage = await compressImage(imageData, maxSizeKB)
      }

      // Validate that the image contains at least 10% skin
      const isValid = await validateSkinPercentage(processedImage, 10)

      if (!isValid) {
        setStatus("error")
        setErrorMessage("The image doesn't contain enough skin (minimum 10% required). Please try again.")
        return
      }

      setCapturedImage(processedImage)
      await analyzeSkin(processedImage)
    } catch (error) {
      setStatus("error")
      setErrorMessage("An error occurred while processing the image. Please try again.")
      console.error(error)
    }
  }

  const analyzeSkin = async (imageData: string) => {
    setStatus("uploading")

    try {
      // Send the image to your backend API
      const response = await fetch("/api/analyze-skin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze skin condition")
      }

      const data = await response.json()
      setSkinResults(data)
      setStatus("success")
    } catch (error) {
      setStatus("error")
      setErrorMessage("Failed to analyze skin condition. Please try again.")
      console.error(error)
    }
  }

  const resetAnalysis = () => {
    setCapturedImage(null)
    setSkinResults(null)
    setStatus("idle")
    setErrorMessage("")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Skin Analysis</CardTitle>
        <CardDescription>Take a photo or upload an image of your skin for analysis</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" && skinResults ? (
          <SkinResults capturedImage={capturedImage!} skinCondition={skinResults} onReset={resetAnalysis} />
        ) : (
          <Tabs defaultValue="camera" className="w-full">
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
              <WebcamCapture onCapture={handleImageCapture} disabled={status !== "idle"} />
            </TabsContent>

            <TabsContent value="upload" className="mt-0">
              <ImageUploader onUpload={handleImageCapture} disabled={status !== "idle"} />
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
            <p className="text-sm text-muted-foreground">Compressing image to reduce size...</p>
          </div>
        )}

        {status === "uploading" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Analyzing skin condition...</p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-destructive/10 p-4 rounded-md mt-4">
            <p className="text-destructive text-sm">{errorMessage}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={resetAnalysis}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

