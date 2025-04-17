"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileImage, X } from "lucide-react";

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
    <div className="flex flex-col items-center relative group">
      <input
        placeholder="Upload your skin"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 z-10 opacity-0"
        ref={fileInputRef}
        disabled={disabled}
      />

      {!previewUrl ? (
        <Card
          className="border-dashed border-2 border-indigo-500/30 group-hover:bg-indigo-500 duration-300 transition-all flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto mb-4 aspect-square cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex items-center justify-center mb-4">
            <FileImage
              size={50}
              className="text-indigo-500/75 -rotate-6 group-hover:text-white/75"
            />
            <FileImage
              size={50}
              className="text-indigo-500/75 rotate-6 group-hover:text-white/75"
            />
          </div>

          <p className="text-lg max-w-[30ch] text-muted-foreground text-center group-hover:text-white">
            <span className="text-indigo-500 font-semibold group-hover:text-sky-300">
              Click
            </span>{" "}
            or{" "}
            <span className="text-indigo-500 font-semibold group-hover:text-sky-300">
              Drag & Drop
            </span>{" "}
            to upload an image of your skin
          </p>
          <p className="text-xs text-muted-foreground mt-2 text-center group-hover:text-white">
            JPG, PNG or GIF (max. 1MB)
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
