"use client"

import { useState, useRef, useCallback } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, RefreshCw } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface WebcamCaptureProps {
  onCapture: (imageData: string) => void
  disabled: boolean
}

export default function WebcamCapture({ onCapture, disabled }: WebcamCaptureProps) {
  const webcamRef = useRef<Webcam>(null)
  const [isCaptured, setIsCaptured] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const isMobile = useMobile()

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user",
  }

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        setCapturedImage(imageSrc)
        setIsCaptured(true)
      }
    }
  }, [webcamRef])

  const retake = () => {
    setCapturedImage(null)
    setIsCaptured(false)
  }

  const confirmImage = () => {
    if (capturedImage) {
      onCapture(capturedImage)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="overflow-hidden mb-4 w-full max-w-md mx-auto">
        {!isCaptured ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-auto aspect-square object-cover"
          />
        ) : (
          <div className="relative">
            <img src={capturedImage || ""} alt="Captured skin" className="w-full h-auto aspect-square object-cover" />
          </div>
        )}
      </Card>

      <div className="flex gap-2 justify-center">
        {!isCaptured ? (
          <Button onClick={capture} disabled={disabled} className="gap-2">
            <Camera className="h-4 w-4" />
            Take Photo
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={retake} disabled={disabled} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Retake
            </Button>
            <Button onClick={confirmImage} disabled={disabled}>
              Confirm & Analyze
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

