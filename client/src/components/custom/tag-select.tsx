"use client";

import { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { MultiSelect } from "@/components/custom/multi-select";
import { loaders } from "@/data/api/loaders";
import type { Tag } from "@/types";

interface ITagSelect {
  tags?: Tag[];
  field?: ControllerRenderProps;
  onValueChange?: (tags: Tag[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  variant?: "default" | "inverted";
  animation?: number;
  maxCount?: number;
}

export function TagSelect({
  tags: propTags,
  field,
  onValueChange,
  defaultValue,
  placeholder = "Select options",
  variant = "inverted",
  animation = 2,
  maxCount = 3
}: ITagSelect) {
  const [tags, setTags] = useState<Tag[]>(propTags || []);
  const [loading, setLoading] = useState(!propTags);

  useEffect(() => {
    if (!propTags) {
      const loadTags = async () => {
        try {
          const response = await loaders.tags.getAllTags();
          setTags(response?.data || []);
        } catch (error) {
          console.error("Failed to load tags:", error);
        } finally {
          setLoading(false);
        }
      };

      loadTags();
    }
  }, [propTags]);

  if (loading) {
    return (
      <div className="flex-between gap-3">
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="flex-between gap-3">
      <MultiSelect
        options={tags || []}
        onValueChange={(selectedValues: string[]) => {
          // Convert string values back to Tag objects
          const selectedTags = tags.filter(tag => 
            selectedValues.includes(tag.value)
          );
          
          if (onValueChange) {
            onValueChange(selectedTags);
          } else if (field?.onChange) {
            field.onChange(selectedTags);
          }
        }}
        defaultValue={defaultValue || field?.value}
        placeholder={placeholder}
        variant={variant}
        animation={animation}
        maxCount={maxCount}
      />
    </div>
  );
}
