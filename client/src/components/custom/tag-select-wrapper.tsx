import { ControllerRenderProps } from "react-hook-form";

import { loaders } from "@/data/api/loaders";
import type { Tag } from "@/types";

import { TagSelect } from "./tag-select";

interface ITagSelectWrapper {
  field?: ControllerRenderProps;
  onValueChange?: (tags: Tag[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  variant?: "default" | "inverted";
  animation?: number;
  maxCount?: number;
}

export async function TagSelectWrapper(props: ITagSelectWrapper) {
  const tags = await loaders.tags.getAllTags();

  return <TagSelect {...props} tags={tags?.data || []} />;
}