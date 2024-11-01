"use client";

import { useCalendarioStore } from "@/store/servicios/useCalendarioStore";
import { useEffect, useState } from "react";
import { format, parse, isWithinInterval } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
export const CalendarioCita = () => {
  const calendario = useCalendarioStore((state) => state.calendario);
  const getCalendario = useCalendarioStore((state) => state.getCalendario);
  useEffect(() => {
    getCalendario("tjyep661z5arkq034sq8h9yv");
  }, []);

  // const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedHour, setSelectedHour] = useState("");

  // const diasTrabajo = calendario.horarios.dias_trabajos[0];
  // const fechaInicio = parse(diasTrabajo.fecha_inicio, "yyyy-MM-dd", new Date());
  // const fechaFinal = parse(diasTrabajo.fecha_final, "yyyy-MM-dd", new Date());

  // const isDateInRange = (date: any) => {
  //   return isWithinInterval(date, { start: fechaInicio, end: fechaFinal });
  // };

  // const horasTrabajo = calendario.horarios.horas_trabajos.map((hora) => ({
  //   id: hora.id,
  //   hora: format(parse(hora.hora_inicio, "HH:mm:ss", new Date()), "HH:mm"),
  // }));
  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      {JSON.stringify(calendario[0].horarios.horas_trabajos[0], null, 2)}

      {/* <h2 className="text-2xl font-bold text-center">Selecciona una Fecha y Hora</h2>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={(date) => !isDateInRange(date)}
        locale={es}
      />
      {selectedDate && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Horas disponibles para {format(selectedDate, "dd 'de' MMMM, yyyy", { locale: es })}
          </h3>
          <RadioGroup value={selectedHour} onValueChange={setSelectedHour}>
            {horasTrabajo.map((hora) => (
              <div key={hora.id} className="flex items-center space-x-2">
                <RadioGroupItem value={hora.hora} id={`hora-${hora.id}`} />
                <Label htmlFor={`hora-${hora.id}`}>{hora.hora}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
      {selectedDate && selectedHour && (
        <p className="text-center font-semibold">
          Cita seleccionada: {format(selectedDate, "dd/MM/yyyy")} a las {selectedHour}
        </p>
      )} */}
    </div>
  );
};
