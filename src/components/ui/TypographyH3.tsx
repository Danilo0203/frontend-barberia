export function TypographyH3({ text }: Readonly<{ text: string }>) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {text}
    </h3>
  );
}
