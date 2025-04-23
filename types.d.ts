export interface Product {
  title: string;
  price: string;
  description: string;
  image: string;
  link: string;
  categories: string[];
  tags: string[];
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

export interface PredictionFailed {
  detail: string;
}
