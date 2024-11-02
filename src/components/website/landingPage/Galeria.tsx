"use client";

import SectionLayout from "@/components/website/SectionLayout";
import Image from "next/image";

const images = [
  "/img/galeria/Foto5.png",
  "/img/galeria/Foto2.png",
  "/img/galeria/Foto1.png",
  "/img/galeria/Foto4.png",
  "/img/galeria/Foto3.png",
  "/img/galeria/Foto6.png",
];

export const Galeria = () => {
  return (
    <SectionLayout id="galeria" title="Galería">
      <article className="flex w-full flex-grow flex-col items-center">
        <div className="mx-auto columns-3 gap-8">
          <Image
            src="/img/galeria/Foto1.png"
            alt="imagen 1"
            width={400}
            height={400}
            className="my-4 rounded-3xl"
          />
          <Image
            src="/img/galeria/Foto4.png"
            alt="imagen 1"
            width={400}
            height={400}
            className="py-4"
          />
          <Image
            src="/img/galeria/Foto2.png"
            alt="imagen 1"
            width={400}
            height={400}
            className="py-4"
          />
          <Image
            src="/img/galeria/Foto3.png"
            alt="imagen 1"
            width={400}
            height={400}
            className="py-4"
          />
          <Image
            src="/img/galeria/Foto5.png"
            alt="imagen 1"
            width={400}
            height={400}
            className="py-4"
          />
          <Image
            src="/img/galeria/Foto6.png"
            alt="imagen 1"
            width={400}
            height={400}
            className="py-4"
          />
        </div>
      </article>
    </SectionLayout>
  );
};
