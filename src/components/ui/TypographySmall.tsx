import { cn } from "@/lib/utils";

export function TypographySmall({
  text,
  className,
}: Readonly<{ text: string; className?: string }>) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {text}
    </small>
  );
}
