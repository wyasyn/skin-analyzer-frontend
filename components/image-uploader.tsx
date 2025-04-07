"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  onUpload: (imageData: string) => void;
  disabled: boolean;
}

export default function ImageUploader({
  onUpload,
  disabled,
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const clearSelectedImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const confirmUpload = () => {
    if (previewUrl) {
      onUpload(previewUrl);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        placeholder="Upload your skin"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
        disabled={disabled}
      />

      {!previewUrl ? (
        <Card
          className="border-dashed border-2 flex flex-col items-center justify-center p-6 cursor-pointer w-full max-w-md mx-auto mb-4 aspect-square"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            Click to upload an image of your skin
          </p>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            JPG, PNG or GIF (max. 10MB)
          </p>
        </Card>
      ) : (
        <Card className="relative w-full max-w-md mx-auto mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 z-10"
            onClick={clearSelectedImage}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Selected skin"
            className="w-full h-auto aspect-square object-cover rounded-md"
          />
        </Card>
      )}

      {previewUrl && (
        <Button onClick={confirmUpload} disabled={disabled}>
          Confirm & Analyze
        </Button>
      )}
    </div>
  );
}
