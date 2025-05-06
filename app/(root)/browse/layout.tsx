import { getAllConditions } from "@/data/getConditionInfo";
import { get } from "http";
import BrowseNav from "./browse-nav";

export default function layout({ children }: { children: React.ReactNode }) {
  const conditions = getAllConditions();
  return (
    <section className="pt-14 md:pt-24 pb-12">
      <div className="flex items-center gap-3 wrapper flex-wrap justify-center mt-10 mb-8">
        {conditions.map((condition) => {
          return (
            <BrowseNav
              key={condition.condition}
              condition={condition.condition}
              count={condition.count}
            />
          );
        })}
      </div>
      {children}
    </section>
  );
}
