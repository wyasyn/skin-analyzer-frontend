"use client";
import React from "react";
import { motion } from "motion/react";
import { Camera, BrainCircuit, FileText, ShoppingBag } from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const aiSkinAnalyzerSteps: Step[] = [
  {
    title: "Step 1: Upload or Take a Photo",
    description:
      "Upload a clear photo of your face or take one using your camera. Ensure your face is well-lit and makeup-free for accurate analysis.",
    icon: <Camera className="w-6 h-6 text-[#E50046]" />,
  },
  {
    title: "Step 2: Let the AI Analyze Your Skin",
    description:
      "The AI scans your image to detect conditions like acne, dryness, and wrinkles. This only takes a few seconds.",
    icon: <BrainCircuit className="w-6 h-6 text-[#E50046]" />,
  },
  {
    title: "Step 3: View Your Skin Report",
    description:
      "Get a detailed skin analysis report highlighting detected conditions and their severity.",
    icon: <FileText className="w-6 h-6 text-[#E50046]" />,
  },
  {
    title: "Step 4: Explore Product Suggestions",
    description:
      "Receive personalized skincare product recommendations tailored to your skin's needs.",
    icon: <ShoppingBag className="w-6 h-6 text-[#E50046]" />,
  },
];

const SkinAnalyzerSteps = () => {
  return (
    <section className="max-w-4xl mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="space-y-6 max-w-3xl mx-auto">
        {aiSkinAnalyzerSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-6 rounded-2xl shadow-md border-l-4 border-[#E50046] hover:shadow-lg transition-shadow"
          >
            <div className="flex-shrink-0">{step.icon}</div>
            <div>
              <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkinAnalyzerSteps;
