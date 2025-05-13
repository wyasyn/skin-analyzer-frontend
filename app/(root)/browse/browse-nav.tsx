"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BrowseNav({
  condition,
  count,
}: {
  condition: string;
  count: number;
}) {
  const pathname = usePathname();
  const conditionSlug = condition.toLowerCase();
  const isActive = pathname === `/browse/${conditionSlug}`;

  return (
    <Link href={`/browse/${conditionSlug}`}>
      <Button variant={isActive ? "default" : "outline"} className="gap-3">
        {condition}
        {count > 0 && (
          <span
            className={cn(
              " -me-1 inline-flex h-5 items-center rounded border px-1 text-[0.625rem] font-medium",
              isActive ? "text-background" : "text-muted-foreground"
            )}
          >
            {count}
          </span>
        )}
      </Button>
    </Link>
  );
}
