export interface Product {
  title: string;
  price: string;
  description: string;
  ingredients: string[];
  image_url: string;
  link: string;
}

export interface ConditionInfo {
  condition: string;
  description: string;
  recommended_products: Product[];
}

export interface PredictionResponse {
  predicted_condition: string;
  confidence: number;
  info?: ConditionInfo; // only present if confidence >= 0.8
}
