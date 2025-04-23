import React from "react";
import StepsCard from "./steps-card";
type Step = {
  title: string;
  description: string;
  image: string; // Use image URL or import path
};
export default function Steps() {
  const aiSkinAnalyzerSteps: Step[] = [
    {
      title: "Step 1: Upload or Take a Photo",
      description:
        "Upload a clear photo of your face or take one using your camera. Make sure your face is well-lit and makeup-free for accurate results.",
      image: "/step-1.svg",
    },
    {
      title: "Step 2: Let the AI Analyze Your Skin",
      description:
        "The AI will process your image and scan for various skin conditions like acne, dryness, and wrinkles. Please wait a few seconds.",
      image: "/step-2.svg",
    },
    {
      title: "Step 3: View Your Skin Report",
      description:
        "Receive a personalized skin analysis report with detected conditions and severity levels.",
      image: "/step-3.jpg",
    },
    {
      title: "Step 4: Explore Product Suggestions",
      description:
        "Discover skincare products recommended based on your skin type and condition.",
      image: "/step-4.jpg",
    },
  ];

  return (
    <section className="py-10">
      <h1>
        <div className="text-3xl font-bold lg:text-5xl text-center mb-4">
          How It Works
        </div>
        <div className="text-muted-foreground max-w-prose text-center mb-8 mx-auto">
          Follow these simple steps to get your personalized skin analysis and
          product recommendations.
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {aiSkinAnalyzerSteps.map((step, index) => (
            <StepsCard
              image={step.image}
              key={index}
              step={step.title}
              description={step.description}
            />
          ))}
        </div>
      </h1>
    </section>
  );
}
