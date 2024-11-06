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

  // Set default barber when barberos are loaded and no barber is selected
  useEffect(() => {
    if (!barberoSeleccionado && barberos.length > 0) {
      const firstBarbero = barberos[0];
      setBarberoSeleccionado({
        ...firstBarbero,
        estado: firstBarbero.estado.toString(),
        usuario: firstBarbero.usuario,
      });
    }
  }, [barberos, barberoSeleccionado]);

  return (
    <RadioGroup
      value={
        barberoSeleccionado
          ? barberoSeleccionado.documentId
          : barberos[0]?.documentId
      }
      onValueChange={(value: string) => {
        if (value === "1") {
          setBarberoSeleccionado(null);
        } else {
          const selectedBarbero = barberos.find(
            (barbero) => barbero.documentId === value,
          );
          if (selectedBarbero) {
            setBarberoSeleccionado({
              ...selectedBarbero,
              estado: selectedBarbero.estado.toString(),
              usuario: selectedBarbero.usuario,
            });
          }
        }
      }}
    >
      {barberos.length > 0 ? (
        barberos.map(
          (barbero) =>
            barbero.estado && (
              <div
                key={barbero.id}
                className="flex items-center space-x-4 rounded-lg p-4 hover:bg-muted"
              >
                <RadioGroupItem
                  value={barbero.documentId}
                  id={barbero.documentId}
                />
                <Label
                  htmlFor={barbero.documentId}
                  className="flex w-full cursor-pointer items-center space-x-4"
                >
                  <Avatar>
                    <AvatarFallback>
                      {barbero.usuario.nombres[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <span>{barbero.usuario.nombres}</span>
                  </div>
                </Label>
              </div>
            ),
        )
      ) : (
        <p className="text-center text-destructive-foreground">
          No hay barberos disponibles
        </p>
      )}
    </RadioGroup>
  );
};
