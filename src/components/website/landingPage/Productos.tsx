"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionLayout from "@/components/website/SectionLayout";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
const productos = [
  { nombre: "Cera", imagen: "/img/productos/cera.png", precio: 20 },
  { nombre: "Cera", imagen: "/img/productos/cera.png", precio: 20 },
  { nombre: "Cera", imagen: "/img/productos/cera.png", precio: 20 },
];
export const Productos = () => {
  return (
    <SectionLayout title="Productos" id="productos">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="mx-auto w-full max-w-6xl"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {productos.map((producto, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/2"
            >
              <div className="p-4">
                <Card className="overflow-hidden rounded-xl border-none bg-black">
                  <CardContent className="p-0">
                    <div className="p-4 px-10">
                      <h3 className="mb-4 text-xl font-bold text-white">
                        {producto.nombre}
                      </h3>
                      <div className="mx-auto flex h-48 items-center justify-center rounded-lg bg-white p-4 md:w-2/3">
                        <Image
                          src={producto.imagen}
                          alt={`${producto.nombre}`}
                          className="h-full w-auto object-contain"
                          width={400}
                          height={400}
                        />
                      </div>
                      <div className="mt-4 text-center text-white">
                        <p className="text-lg">Precio: Q{producto.precio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 md:-left-12" />
        <CarouselNext className="right-0 md:-right-12" />
      </Carousel>
    </SectionLayout>
  );
};
