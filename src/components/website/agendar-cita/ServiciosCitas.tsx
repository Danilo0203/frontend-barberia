"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useServiciosStore } from "@/store/servicios/useServiciosStore";

import { useEffect } from "react";

export const ServiciosCitas = () => {
  const servicios = useServiciosStore((state) => state.servicios);
  const getServicios = useServiciosStore((state) => state.dataServicios);
  useEffect(() => {
    getServicios();
  }, []);
  const minutos = (tiempo: string) => {
    if (!tiempo) return 0; // Devuelve 0 si tiempo es undefined o una cadena vacía
    const [horas, minutos] = tiempo?.split(":").map(Number);
    return horas * 60 + minutos;
  };
  const formatQuetzales = (precio: number) => {
    if (!precio) return 0; // Devuelve 0 si precio es undefined o null
    return new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
    }).format(precio);
  };
  return (
    <Accordion type="single" collapsible className="w-full">
      {servicios.map((servicio) => (
        <AccordionItem key={servicio.id} value={`item-${servicio.id}`}>
          <AccordionTrigger>{servicio.nombre}</AccordionTrigger>
          <AccordionContent>
            {Array.isArray(servicio.tipo_servicios) && "tipo" in servicio.tipo_servicios[0] ? (
              <RadioGroup>
                {servicio.tipo_servicios.map((tipoServicio) => (
                  <div key={tipoServicio.id} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={tipoServicio.id.toString()} id={`servicio-${tipoServicio.id}`} />
                    <Label htmlFor={`servicio-${tipoServicio.id}`} className="flex flex-col">
                      <span>{tipoServicio.tipo}</span>
                      <span className="text-sm text-gray-500">
                        {formatQuetzales(tipoServicio.precio)} - {minutos(tipoServicio.tiempo.toString())} minutos
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <p className="text-destructive">{servicio.tipo_servicios[0].message}</p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
