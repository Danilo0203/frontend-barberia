"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useBarberosStore } from "@/store/servicios/useBarberosStore";
import { useCitaStore } from "@/store/servicios/useCitaStore";
import { useEffect } from "react";

export const BarberosCitas = () => {
  const getBarberos = useBarberosStore((state) => state.dataBarberos);
  const barberos = useBarberosStore((state) => state.barberos);

  const barberoSeleccionado = useCitaStore(
    (state) => state.barberoSeleccionado,
  );
  const setBarberoSeleccionado = useCitaStore(
    (state) => state.setBarberoSeleccionado,
  );

  useEffect(() => {
    getBarberos();
  }, []);

  console.log(barberos);

  return (
    <RadioGroup
      value={barberoSeleccionado ? barberoSeleccionado.documentId : "1"}
      onValueChange={(value: string) => {
        if (value === "1") {
          setBarberoSeleccionado(null);
        } else {
          const selectedBarbero = barberos.find(
            (barbero) => barbero.documentId === value,
          );
          if (selectedBarbero) {
            const barberoToSet = {
              ...selectedBarbero,
              estado: selectedBarbero.estado.toString(),
            };
            setBarberoSeleccionado(barberoToSet);
          }
        }
      }}
    >
      <div className="flex items-center space-x-4 rounded-lg p-4 hover:bg-muted">
        <RadioGroupItem value="1" id="1" defaultChecked />
        <Label
          htmlFor="1"
          className="flex w-full cursor-pointer items-center space-x-4"
        >
          No hay preferencia
        </Label>
      </div>
      {barberos.map((barbero) => (
        <div
          key={barbero.id}
          className="flex items-center space-x-4 rounded-lg p-4 hover:bg-muted"
        >
          <RadioGroupItem value={barbero.documentId} id={barbero.documentId} />
          <Label
            htmlFor={barbero.documentId}
            className="flex w-full cursor-pointer items-center space-x-4"
          >
            <Avatar>
              <AvatarFallback>{barbero.usuario.nombres[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <span>{barbero.usuario.nombres}</span>
              {/* <span className="capitalize text-muted-foreground">
                {barbero.usuario.rol.nombre.toLowerCase()}
              </span> */}
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
