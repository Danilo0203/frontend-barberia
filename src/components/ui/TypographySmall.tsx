export function TypographySmall({ text }: Readonly<{ text: string }>) {
  return <small className="text-sm font-medium leading-none">{text}</small>;
}
