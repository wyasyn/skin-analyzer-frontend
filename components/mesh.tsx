import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export function HeroWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-[70vh] md:min-h-[400px] w-full items-center justify-center ">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,hsl(var(--border)/35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/35)_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_5%,background)] "></div>
      <div className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
        {children}
      </div>
    </div>
  );
}
