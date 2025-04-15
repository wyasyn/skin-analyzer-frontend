"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { PredictionResponse } from "@/types";

interface SkinResultsProps {
  capturedImage: string;
  skinCondition: PredictionResponse;
  onReset: () => void;
}

export default function SkinResults({
  capturedImage,
  skinCondition,
  onReset,
}: SkinResultsProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Your Skin Analysis</h3>
          <Card className="overflow-hidden">
            <img
              src={capturedImage || "/placeholder.svg"}
              alt="Analyzed skin"
              className="w-full h-auto aspect-square object-cover"
            />
          </Card>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Detected Condition</h3>
            </div>
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-xl font-semibold mb-2">
                  {skinCondition.predicted_condition}
                </h4>
                <p className="text-muted-foreground">
                  {skinCondition.info?.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Recommended Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skinCondition.info?.recommended_products.map((product) => (
            <Card key={product.image_url} className="overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={
                    product.image_url || "/placeholder.svg?height=200&width=200"
                  }
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium line-clamp-1">{product.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button onClick={onReset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          New Analysis
        </Button>
      </div>
    </div>
  );
}

function getSeverityVariant(
  severity: string
): "default" | "outline" | "secondary" | "destructive" {
  switch (severity.toLowerCase()) {
    case "mild":
      return "secondary";
    case "moderate":
      return "default";
    case "severe":
      return "destructive";
    default:
      return "outline";
  }
}
