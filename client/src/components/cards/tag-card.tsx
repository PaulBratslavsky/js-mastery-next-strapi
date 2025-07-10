import Link from "next/link";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { getDevIcon } from "@/lib/utils";

const tagColors = [
  "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
  "bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100",
  "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100",
  "bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100",
];

interface TagCardInterface {
  documentId: string;
  name: string;
  questions: number;
  showCount?: boolean;
  compact?: boolean;
}

export function TagCard({
  documentId,
  name,
  questions,
  showCount,
}: TagCardInterface) {
  const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];
  const iconClassName = getDevIcon(name);
  return (
    <Link href={ROUTES.TAGS(documentId)} className="inline-flex">
      <Badge className={cn("flex items-center gap-2 px-3 py-1", randomColor)}>
        <i className={cn(iconClassName, "text-sm")}></i>
        <span>{name}</span>
        {showCount && <p className="small-medium">{questions}</p>}
      </Badge>
    </Link>
  );
}