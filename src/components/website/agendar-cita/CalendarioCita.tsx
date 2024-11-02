"use client";

import { useCalendarioStore } from "@/store/servicios/useCalendarioStore";
import { useEffect, useState } from "react";
import { format, isBefore, isAfter } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { useCitaStore } from "@/store/servicios/useCitaStore";

export const CalendarioCita = () => {
  const calendario = useCalendarioStore((state) => state.calendario);
  const loading = useCalendarioStore((state) => state.loading);
  const error = useCalendarioStore((state) => state.error);
  const getCalendario = useCalendarioStore((state) => state.getCalendario);
  const barberoSeleccionado = useCitaStore(
    (state) => state.barberoSeleccionado,
  );
  const fechaSeleccionada = useCitaStore((state) => state.fechaSeleccionada);
  const setFechaSeleccionada = useCitaStore(
    (state) => state.setFechaSeleccionada,
  );
  const horaSeleccionada = useCitaStore((state) => state.horaSeleccionada);
  const setHoraSeleccionada = useCitaStore(
    (state) => state.setHoraSeleccionada,
  );
  useEffect(() => {
    if (barberoSeleccionado) {
      getCalendario(barberoSeleccionado.documentId);
      setFechaSeleccionada(null);
      setHoraSeleccionada(null);
    }
  }, [
    barberoSeleccionado,
    getCalendario,
    setFechaSeleccionada,
    setHoraSeleccionada,
  ]);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    setFechaSeleccionada(selectedDate || null);
    setHoraSeleccionada(null);
  };

  const handleSelectHour = (value: string) => {
    setHoraSeleccionada(value);
  };

  if (loading) {
    return <p>Cargando calendario...</p>;
  }

  if (error || !calendario) {
    return <p>No hay disponibilidad para este barbero.</p>;
  }

  const barberoData = calendario.barbero;
  if (!barberoData) {
    return <p>No hay datos del barbero.</p>;
  }

  const diasTrabajo = barberoData.dias_trabajos;
  const horasTrabajo = barberoData.horas_trabajos;

  if (!diasTrabajo || !horasTrabajo) {
    return <p>No hay horarios disponibles para este barbero.</p>;
  }

  const fechaInicio = diasTrabajo[0]?.fecha_inicio
    ? new Date(diasTrabajo[0].fecha_inicio)
    : undefined;
  const fechaFinal = diasTrabajo[0]?.fecha_final
    ? new Date(diasTrabajo[0].fecha_final)
    : undefined;

  const isDateUnavailable = (date: Date) => {
    if (!fechaInicio || !fechaFinal) return false;
    return isBefore(date, fechaInicio) || isAfter(date, fechaFinal);
  };

  return (
    <>
      <Calendar
        mode="single"
        selected={fechaSeleccionada || undefined}
        onSelect={handleSelectDate}
        disabled={isDateUnavailable}
        locale={es}
        fromDate={fechaInicio}
        toDate={fechaFinal}
        className="w-full"
      />
      {fechaSeleccionada && (
        <div className="mt-4">
          <h3 className="mb-2 font-semibold">
            Horarios disponibles para{" "}
            {format(fechaSeleccionada, "dd 'de' MMMM, yyyy", { locale: es })}:
          </h3>
          <RadioGroup
            value={horaSeleccionada || undefined}
            onValueChange={handleSelectHour}
          >
            {horasTrabajo.map((hora) => (
              <div key={hora.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={hora.hora_inicio}
                  id={`hora-${hora.id}`}
                />
                <Label htmlFor={`hora-${hora.id}`}>{hora.hora_inicio}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </>
  );
};
