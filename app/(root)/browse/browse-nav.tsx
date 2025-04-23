"use client";

import { Button } from "@/components/ui/button";
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
          <span className="text-muted-foreground -me-1 inline-flex h-5 items-center rounded border px-1 text-[0.625rem] font-medium">
            {count}
          </span>
        )}
      </Button>
    </Link>
  );
}
