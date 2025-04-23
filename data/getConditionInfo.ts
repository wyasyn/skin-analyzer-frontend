import { ConditionInfo } from "@/types";
import { data } from "./skin_conditions";

export function getConditionInfo(condition: string): ConditionInfo | undefined {
  return data.find(
    (item) => item.condition.toLowerCase() === condition.toLowerCase()
  );
}

export function getAllConditions(): { condition: string; count: number }[] {
  return data
    .map((item) => ({
      condition: item.condition,
      count: item.recommended_products.length,
    }))
    .sort((a, b) => b.count - a.count);
}
