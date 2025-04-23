import { ConditionInfo } from "@/types";
import { data } from "./skin_conditions";

export function getConditionInfo(condition: string): ConditionInfo | undefined {
  return data.find(
    (item) => item.condition.toLowerCase() === condition.toLowerCase()
  );
}
