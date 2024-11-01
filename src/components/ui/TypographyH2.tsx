import { cn } from "@/lib/utils";

export function TypographyH2({
  text,
  className,
}: Readonly<{ text: string; className?: string }>) {
  return (
    <h2
      className={cn(
        "w-full text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {text}
    </h2>
  );
}
