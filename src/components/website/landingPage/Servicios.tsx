"use client";
import { Card, CardContent } from "@/components/ui/card";
import SectionLayout from "../SectionLayout";
import { Diamond } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export const Servicios = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SectionLayout id="servicios" title="Servicios">
      <article className="mt-10 grid gap-6 md:grid-cols-2">
        <Card
          className="border-none bg-transparent shadow-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardContent className="relative overflow-hidden rounded-2xl p-0">
            <Image
              src="/img/servicios/servicio1.png"
              alt="Afeitado de barba"
              className="h-full w-full object-cover"
              width={600}
              height={100}
            />
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                isHovered ? "bg-orange-600/90" : "bg-black/40"
              }`}
            >
              {!isHovered && (
                <span className="absolute bottom-4 left-4 text-xl font-bold text-white">
                  CORTE DE CABELLO
                </span>
              )}
              <div
                className={`absolute inset-0 flex flex-col items-start justify-center p-6 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <Diamond className="mb-4 text-white" size={24} />
                <p className="text-sm text-white">
                  Nuestros estilistas experimentados son expertos en crear una
                  amplia variedad de estilos de peinado para adaptarse a tus
                  preferencias. Ya sea que busques un corte de cabello moderno,
                  un recogido clásico o un peinado para una ocasión especial.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="border-none bg-transparent shadow-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardContent className="relative overflow-hidden rounded-2xl p-0">
            <Image
              src="/img/servicios/servicio1.png"
              alt="Afeitado de barba"
              className="h-full w-full object-cover"
              width={600}
              height={100}
            />
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                isHovered ? "bg-orange-600/90" : "bg-black/40"
              }`}
            >
              {!isHovered && (
                <span className="absolute bottom-4 left-4 text-xl font-bold text-white">
                  AFEITADO DE BARBA
                </span>
              )}
              <div
                className={`absolute inset-0 flex flex-col items-start justify-center p-6 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <Diamond className="mb-4 text-white" size={24} />
                <p className="text-sm text-white">
                  Nuestros estilistas experimentados son expertos en crear una
                  amplia variedad de estilos de peinado para adaptarse a tus
                  preferencias. Ya sea que busques un corte de cabello moderno,
                  un recogido clásico o un peinado para una ocasión especial.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>
    </SectionLayout>
  );
};
