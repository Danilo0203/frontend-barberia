import { TypographyH2 } from "../ui/TypographyH2";

export default function SectionLayout({
  id,
  children,
  title,
}: Readonly<{ id: string; children: React.ReactNode; title?: string }>) {
  return (
    <section
      id={id}
      className="p container mx-auto mb-36 flex flex-1 scroll-mt-36 flex-col px-6"
    >
      {title && <TypographyH2 text={title} className="text-center" />}

      {children}
    </section>
  );
}
