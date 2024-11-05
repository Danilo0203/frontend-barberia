"use client";

import { useCalendarioStore } from "@/store/servicios/useCalendarioStore";
import { useEffect } from "react";
import { format, isBefore, isAfter } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { useCitaStore } from "@/store/servicios/useCitaStore";
import { Clock } from "lucide-react";
import { TypographySmall } from "@/components/ui/TypographySmall";
import { TypographyH3 } from "@/components/ui/TypographyH3";
import { TypographyH4 } from "../../ui/TypographyH4";
import { TypographyMuted } from "@/components/ui/TypographyMuted";

export const CalendarioCita = () => {
  const calendario = useCalendarioStore((state) => state.calendario);
  const loading = useCalendarioStore((state) => state.loading);
  const error = useCalendarioStore((state) => state.error);
  const getCalendario = useCalendarioStore((state) => state.getCalendario);
  console.log(calendario);
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

  const diasTrabajo = calendario.dias_trabajos;
  const horasTrabajo = calendario.horas_trabajos;

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

  const formatoHorasDiponibles = horasTrabajo.map((hora) => {
    const [hours, minutes] = hora.hora_inicio.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    const formateo = format(date, "h:mm a");
    return {
      id: hora.id,
      hora: formateo,
      date: date,
    };
  });
  const horasManana = formatoHorasDiponibles.filter(
    (hora) => hora.date.getHours() < 12,
  );
  const horasTarde = formatoHorasDiponibles.filter(
    (hora) => hora.date.getHours() >= 12,
  );

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
            <div className="grid grid-cols-2 gap-4">
              {/* Columna de la Mañana */}
              <div className="flex flex-col gap-4">
                <TypographyMuted text="Mañana" />
                {horasManana.length > 0 ? (
                  horasManana.map((hora) => (
                    <div key={hora.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={hora.hora}
                        id={`hora-${hora.id}`}
                        className="flex items-center space-x-2"
                      />
                      <Label htmlFor={`hora-${hora.id}`}>
                        <TypographySmall text={hora.hora} />
                      </Label>
                    </div>
                  ))
                ) : (
                  <TypographySmall
                    text="No hay horarios disponibles"
                    className="text-xs leading-none text-muted-foreground"
                  />
                )}
              </div>
              {/* Columna de la Tarde */}
              <div>
                <TypographyMuted text="Tarde" />
                {horasTarde.length > 0 ? (
                  horasTarde.map((hora) => (
                    <div key={hora.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={hora.hora}
                        id={`hora-${hora.id}`}
                        className="flex items-center space-x-2"
                      />
                      <Label htmlFor={`hora-${hora.id}`}>
                        <TypographySmall text={hora.hora} />
                      </Label>
                    </div>
                  ))
                ) : (
                  <TypographySmall
                    text="No hay horarios disponibles"
                    className="text-xs leading-none text-muted-foreground"
                  />
                )}
              </div>
            </div>
          </RadioGroup>
        </div>
      )}
    </>
  );
};
