"use client";
import { Card, CardContent } from "@/components/ui/card";
import SectionLayout from "@/components/website/SectionLayout";
import { Diamond } from "lucide-react";

import Image from "next/image";

export const Servicios = () => {
  return (
    <SectionLayout id="servicios" title="Servicios">
      <article className="grid gap-6 md:grid-cols-2">
        <Card className="group border-none bg-transparent shadow-none">
          <CardContent className="relative h-[500px] overflow-hidden rounded-2xl p-0">
            <Image
              src="/img/servicios/servicio1.png"
              alt="Afeitado de barba"
              className="h-full w-full object-cover"
              width={400}
              height={300}
            />
            <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-orange-600/90">
              <span className="absolute bottom-4 left-4 text-xl font-bold text-white transition-opacity duration-300 group-hover:opacity-0">
                CORTE DE CABELLO
              </span>
              <div className="absolute inset-0 flex flex-col items-start justify-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
        <Card className="group border-none bg-transparent shadow-none">
          <CardContent className="relative h-[500px] overflow-hidden rounded-2xl p-0">
            <Image
              src="/img/servicios/servicio2.png"
              alt="Afeitado de barba"
              className="h-full w-full object-cover"
              width={400}
              height={300}
            />
            <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-orange-600/90">
              <span className="absolute bottom-4 left-4 text-xl font-bold text-white transition-opacity duration-300 group-hover:opacity-0">
                CORTE DE BARBA
              </span>
              <div className="absolute inset-0 flex flex-col items-start justify-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
