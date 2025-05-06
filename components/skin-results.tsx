"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, AlertTriangle } from "lucide-react";
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
  const { predicted_condition, confidence, info } = skinCondition;
  const recommendedProducts = info?.recommended_products ?? [];

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
        <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0" />
        <div>
          <h4 className="font-semibold text-yellow-700">Disclaimer</h4>
          <p className="text-sm text-yellow-800">
            This analysis is for informational purposes and may not be 100%
            accurate. Skin conditions can be complex—please consult a qualified
            dermatologist for a professional evaluation.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Preview */}
        <div>
          <h3 className="text-lg font-medium mb-2">Your Skin Analysis</h3>
          <Card className="overflow-hidden">
            <img
              src={capturedImage || "/placeholder-image.jpg"}
              alt="Analyzed skin"
              className="w-full h-auto aspect-square object-cover"
            />
          </Card>
        </div>

        {/* Analysis Details */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Detected Condition</h3>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-xl font-semibold">
                    {predicted_condition}
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    {confidence.toFixed(1)}%
                  </span>
                </div>
                {info?.description && (
                  <p className="mt-4 text-muted-foreground">
                    {info.description}
                  </p>
                )}
              </CardContent>
            </Card>
            <a
              href="https://calendly.com/auroraorganic4u"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block"
            >
              <Button variant="default">Book Free Consultation</Button>
            </a>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Recommended Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <a
                key={product.image}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image || "/placeholder-image.jpg"}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium line-clamp-1">
                      {product.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="flex justify-center mt-8">
        <Button onClick={onReset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          New Analysis
        </Button>
      </div>
    </div>
  );
}
