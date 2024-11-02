"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { useCitaStore } from "@/store/servicios/useCitaStore";
import { useServiciosStore } from "@/store/servicios/useServiciosStore";
import { Checkbox } from "@/components/ui/checkbox";

import { useEffect } from "react";

export const ServiciosCitas = () => {
  const servicios = useServiciosStore((state) => state.servicios);
  const getServicios = useServiciosStore((state) => state.dataServicios);

  const serviciosSeleccionados = useCitaStore(
    (state) => state.serviciosSeleccionados,
  );
  const addServicioSeleccionado = useCitaStore(
    (state) => state.addServicioSeleccionado,
  );
  const removeServicioSeleccionado = useCitaStore(
    (state) => state.removeServicioSeleccionado,
  );

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
    <Accordion type="multiple" className="w-full">
      {servicios.map((servicio) => (
        <AccordionItem key={servicio.id} value={`item-${servicio.id}`}>
          <AccordionTrigger>{servicio.nombre}</AccordionTrigger>
          <AccordionContent>
            {Array.isArray(servicio.tipo_servicios) &&
            "tipo" in servicio.tipo_servicios[0] ? (
              <>
                {servicio.tipo_servicios.map((tipoServicio) => {
                  const isChecked = serviciosSeleccionados.some(
                    (s) => s.id === tipoServicio.id,
                  );
                  return (
                    <div
                      key={tipoServicio.id}
                      className="mb-2 flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`servicio-${tipoServicio.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addServicioSeleccionado(tipoServicio);
                          } else {
                            removeServicioSeleccionado(tipoServicio.id);
                          }
                        }}
                      />
                      <Label
                        htmlFor={`servicio-${tipoServicio.id}`}
                        className="flex flex-col"
                      >
                        <span>{tipoServicio.tipo}</span>
                        <span className="text-xs text-gray-500">
                          {formatQuetzales(tipoServicio.precio)} -{" "}
                          {minutos(tipoServicio.tiempo.toString())} minutos
                        </span>
                      </Label>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="text-destructive">
                {servicio.tipo_servicios[0].message}
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
