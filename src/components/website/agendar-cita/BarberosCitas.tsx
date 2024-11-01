"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useBarberosStore } from "@/store/servicios/useBarberosStore";
import { useEffect } from "react";

export const BarberosCitas = () => {
  const getBarberos = useBarberosStore((state) => state.dataBarberos);
  const barberos = useBarberosStore((state) => state.barberos);

  useEffect(() => {
    getBarberos();
  }, []);
  return (
    <>
      <h2 className="text-xl font-bold">Selecciona un Barbero</h2>
      <RadioGroup>
        <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted">
          <RadioGroupItem value="1" id="1" />
          <Label htmlFor="1" className="flex items-center space-x-4 cursor-pointer">
            No hay preferencia
          </Label>
        </div>

        {barberos.map((barbero) => (
          <div key={barbero.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted">
            <RadioGroupItem value={barbero.documentId} id={barbero.documentId} />
            <Label htmlFor={barbero.documentId} className="flex items-center space-x-4 cursor-pointer">
              <Avatar>
                <AvatarFallback>{barbero.usuario.nombres[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <span>{barbero.usuario.nombres}</span>
                <span className="capitalize">{barbero.usuario.rol.nombre.toLowerCase()}</span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
};
