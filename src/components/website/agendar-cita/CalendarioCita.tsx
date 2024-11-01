"use client";

import { useCalendarioStore } from "@/store/servicios/useCalendarioStore";
import { useEffect, useState } from "react";
import { format, isBefore, isAfter } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { es } from "date-fns/locale";

export const CalendarioCita = () => {
  const [calendario] = useCalendarioStore((state) => state.calendario);
  const getCalendario = useCalendarioStore((state) => state.getCalendario);
  useEffect(() => {
    getCalendario("wcg5bbpy0twmjtnk6y3zs14v");
  }, []);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedHour, setSelectedHour] = useState<string | undefined>(undefined);

  // Asumimos que usamos el primer barbero del array
  const barberoData = calendario?.barbero;
  const diasTrabajo = barberoData?.dias_trabajos;
  const fechaInicio = diasTrabajo?.[0]?.fecha_inicio;
  const fechaFinal = diasTrabajo?.[0]?.fecha_final;

  const isDateUnavailable = (date: Date) => {
    return isBefore(date, fechaInicio) || isAfter(date, fechaFinal);
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedHour(undefined);
  };

  const handleReserva = () => {
    if (date && selectedHour) {
      alert(`Reserva confirmada para el ${format(date, "dd 'de' MMMM, yyyy", { locale: es })} a las ${selectedHour}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Calendario del Barbero</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={isDateUnavailable}
          locale={es}
          fromDate={fechaInicio}
          toDate={fechaFinal}
          className="rounded-md border shadow"
        />
        {date && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">
              Horarios disponibles para {format(date, "dd 'de' MMMM, yyyy", { locale: es })}:
            </h3>
            <RadioGroup value={selectedHour} onValueChange={setSelectedHour}>
              {barberoData.horas_trabajos.map((hora) => (
                <div key={hora.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={hora.hora_inicio} id={`hora-${hora.id}`} />
                  <Label htmlFor={`hora-${hora.id}`}>{hora.hora_inicio}</Label>
                </div>
              ))}
            </RadioGroup>
            {selectedHour && (
              <Button onClick={handleReserva} className="mt-4 w-full">
                Reservar
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
