import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tagColors = [
  "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
  "bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100",
  "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100",
  "bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100",
];

interface SimpleTagInterface {
  name: string;
}

export function SimpleTag({ name }: SimpleTagInterface) {
  const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];
  return (
    <Badge className={cn(randomColor)}>
      <span>{name}</span>
    </Badge>
  );
}
