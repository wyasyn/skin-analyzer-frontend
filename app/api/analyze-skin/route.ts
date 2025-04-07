import { NextResponse } from "next/server";

// Mock database of products
const products = [
  {
    id: "prod_1",
    name: "Hydrating Serum",
    description: "Deeply hydrates dry skin with hyaluronic acid and vitamin E",
    imageUrl:
      "https://images.unsplash.com/photo-1605204359736-9a08b7175fc7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    forConditions: ["dry skin", "dehydration"],
  },
  {
    id: "prod_2",
    name: "Oil Control Moisturizer",
    description:
      "Lightweight formula that controls excess oil while maintaining hydration",
    imageUrl:
      "https://images.unsplash.com/photo-1626285890705-06ca976a37e8?q=80&w=1848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    forConditions: ["oily skin", "acne"],
  },
  {
    id: "prod_3",
    name: "Gentle Exfoliating Toner",
    description:
      "Removes dead skin cells and unclogs pores with salicylic acid",
    imageUrl:
      "https://images.unsplash.com/photo-1709813610121-e2a51545e212?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    forConditions: ["acne", "blackheads", "uneven texture"],
  },
  {
    id: "prod_4",
    name: "Soothing Redness Relief",
    description: "Calms irritated skin with aloe vera and centella asiatica",
    imageUrl:
      "https://images.unsplash.com/photo-1534221905680-192a9a88ac81?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    forConditions: ["redness", "sensitivity", "irritation"],
  },
  {
    id: "prod_5",
    name: "Brightening Vitamin C Serum",
    description: "Fades dark spots and evens skin tone with 15% vitamin C",
    imageUrl:
      "https://images.unsplash.com/photo-1714980716170-64cae2744604?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    forConditions: ["hyperpigmentation", "dullness", "uneven tone"],
  },
  {
    id: "prod_6",
    name: "Retinol Night Cream",
    description: "Reduces fine lines and improves skin texture with retinol",
    imageUrl:
      "https://images.unsplash.com/photo-1598460880248-71ec6d2d582b?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    forConditions: ["aging", "fine lines", "wrinkles"],
  },
];

// Mock skin conditions
const skinConditions = [
  {
    condition: "Mild Acne",
    description:
      "Presence of some whiteheads, blackheads, and small pimples. Minimal inflammation.",
    severity: "Mild",
    recommendedProducts: [products[1], products[2], products[3]],
  },
  {
    condition: "Dry Skin",
    description:
      "Skin appears flaky, rough, or dull due to lack of moisture. May feel tight after cleansing.",
    severity: "Moderate",
    recommendedProducts: [products[0], products[3], products[5]],
  },
  {
    condition: "Hyperpigmentation",
    description:
      "Darker patches on skin caused by excess melanin production. Often appears as sun spots or post-inflammatory marks.",
    severity: "Moderate",
    recommendedProducts: [products[4], products[5], products[0]],
  },
  {
    condition: "Oily Skin",
    description:
      "Excess sebum production causing shiny appearance, particularly in the T-zone. May lead to enlarged pores.",
    severity: "Mild",
    recommendedProducts: [products[1], products[2], products[4]],
  },
  {
    condition: "Sensitive Skin",
    description:
      "Skin that easily reacts with redness, irritation or discomfort to environmental factors or products.",
    severity: "Moderate",
    recommendedProducts: [products[3], products[0], products[4]],
  },
];

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // In a real application, you would:
    // 1. Process the image to extract skin features
    // 2. Use ML model to analyze the skin condition
    // 3. Return the analysis results

    // For this example, we'll return a mock response
    // In a real app, this would be the result of actual image analysis

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Return a random skin condition from our mock data
    const randomIndex = Math.floor(Math.random() * skinConditions.length);
    const analysis = skinConditions[randomIndex];

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error analyzing skin:", error);
    return NextResponse.json(
      { error: "Failed to analyze skin" },
      { status: 500 }
    );
  }
}
