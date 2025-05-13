"use client";
import React from "react";
import { motion } from "motion/react";
import { Camera, BrainCircuit, FileText, ShoppingBag } from "lucide-react";
import TryOut from "./try-out";

type Step = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const aiSkinAnalyzerSteps: Step[] = [
  {
    title: " Upload or Take a Photo",
    description:
      "Upload a clear photo of your face or take one using your camera. Ensure your face is well-lit and makeup-free for accurate analysis.",
    icon: <Camera className="w-6 h-6 text-primary" />,
  },
  {
    title: " Let the AI Analyze Your Skin",
    description:
      "The AI scans your image to detect conditions like acne, dryness, and wrinkles. This only takes a few seconds.",
    icon: <BrainCircuit className="w-6 h-6 text-primary" />,
  },
  {
    title: " View Your Skin Report",
    description:
      "Get a detailed skin analysis report highlighting detected conditions and their severity.",
    icon: <FileText className="w-6 h-6 text-primary" />,
  },
  {
    title: " Explore Product Suggestions",
    description:
      "Receive personalized skincare product recommendations tailored to your skin's needs.",
    icon: <ShoppingBag className="w-6 h-6 text-primary" />,
  },
];

const SkinAnalyzerSteps = () => {
  return (
    <section className="py-16 md:py-40 wrapper">
      <h2 className="text-3xl md:text-5xl text-center mb-10 md:mb-24 ">
        How It Works
      </h2>
      <div className="grid gap-12 sm:grid-cols-2 ">
        {aiSkinAnalyzerSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 flex-col py-6 px-8 rounded-2xl shadow-md border-l-4 border-primary hover:shadow-lg transition-shadow"
          >
            <div className="flex-shrink-0 flex items-start justify-between w-full">
              <span className="text-5xl font-mono font-bold">{index + 1}</span>
              {step.icon}
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <TryOut />
    </section>
  );
};

export default SkinAnalyzerSteps;
