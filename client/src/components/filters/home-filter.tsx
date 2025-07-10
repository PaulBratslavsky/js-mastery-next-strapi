"use client";
import { useQueryState } from "nuqs";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const filters = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Popular",
    value: "popular",
  },
  {
    name: "Unanswered",
    value: "unanswered",
  },
  {
    name: "Recommended",
    value: "recommended",
  },
  {
    name: "React",
    value: "react",
  },
  {
    name: "JavaScript",
    value: "javascript",
  },
];

export function HomeFilter() {

  const [query, setSearchQuery] = useQueryState("filters", {
    defaultValue: "",
    shallow: false,
  });

  const [active, setActive] = useState(query || "");

  const handleFilterClick = (value: string) => {
    setActive(value);
    if (value === active) {
      setSearchQuery("");
      setActive("");
    } else {
      setSearchQuery(value);
    }
  };

  return (
    <div className="hidden mt-10 sm:flex flex-wrap gap-3">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant="outline"
          className={cn(
            "hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white flex items-center justify-between rounded-full body-medium px-6 py-3 capitalize shadow-none",
            active === filter.value && "bg-primary-500 text-white dark:bg-primary-500 dark:text-white"
          )}
          onClick={() => handleFilterClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}

