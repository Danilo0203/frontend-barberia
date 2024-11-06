"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ServiciosCitas } from "./ServiciosCitas";
import { BarberosCitas } from "./BarberosCitas";
import { CalendarioCita } from "./CalendarioCita";
import { useCitaStore } from "@/store/servicios/useCitaStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TypographySmall } from "@/components/ui/TypographySmall";
import { Clock, ShoppingBag, UserCheck } from "lucide-react";
import { formatQuetzales, minutos } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export function ModalAgendarCita() {
  const [pasoActual, setPasoActual] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  console.log(session);

  const serviciosSeleccionados = useCitaStore(
    (state) => state.serviciosSeleccionados,
  );
  const barberoSeleccionado = useCitaStore(
    (state) => state.barberoSeleccionado,
  );
  const fechaSeleccionada = useCitaStore((state) => state.fechaSeleccionada);
  const horaSeleccionada = useCitaStore((state) => state.horaSeleccionada);
  const resetStore = useCitaStore((state) => state.reset); // Get the reset function

  useEffect(() => {
    if (
      (pasoActual === 0 && serviciosSeleccionados.length > 0) ||
      (pasoActual === 2 && fechaSeleccionada && horaSeleccionada)
    ) {
      setErrorMessage(null);
    }
  }, [pasoActual, serviciosSeleccionados, fechaSeleccionada, horaSeleccionada]);

  const pasos = [
    {
      title: "Selecciona el Servicio",
      description: "Elige el servicio para el cual deseas agendar una cita.",
      contenido: <ServiciosCitas />,
    },
    {
      title: "Selecciona un Barbero",
      description: "Elige un barbero para el cual deseas agendar una cita.",
      contenido: <BarberosCitas />,
    },
    {
      title: "Selecciona un horario",
      description: "Elige un horario para el cual deseas agendar una cita.",
      contenido: <CalendarioCita />,
    },
  ];

  const siguientePaso = () => {
    if (pasoActual < pasos.length - 1) {
      // Validaciones basadas en el paso actual
      if (pasoActual === 0) {
        // Paso 0: Validar que al menos un servicio esté seleccionado
        if (serviciosSeleccionados.length === 0) {
          setErrorMessage("Por favor, selecciona al menos un servicio.");
        } else {
          setPasoActual(pasoActual + 1);
          setErrorMessage(null);
        }
      } else if (pasoActual === 1) {
        // Paso 1: Puedes agregar validación si es necesario
        setPasoActual(pasoActual + 1);
        setErrorMessage(null);
      } else if (pasoActual === 2) {
        // Paso 2: Validar que se haya seleccionado fecha y hora
        if (!fechaSeleccionada || !horaSeleccionada) {
          setErrorMessage("Por favor, selecciona una fecha y hora.");
        } else {
          setPasoActual(pasoActual + 1);
          setErrorMessage(null);
        }
      }
    } else {
      // Lógica para agendar la cita en el último paso
      const servicios = useCitaStore.getState().serviciosSeleccionados;
      const barbero = useCitaStore.getState().barberoSeleccionado;
      const fecha = useCitaStore.getState().fechaSeleccionada;
      const hora = useCitaStore.getState().horaSeleccionada;

      // Aquí puedes agregar la lógica para agendar la cita
      // ...

      // Reiniciar el proceso o cerrar el modal
      setPasoActual(0);
      setErrorMessage(null);
      setOpen(false); // Close the modal after scheduling
    }
  };

  const pasoAnterior = () => {
    if (pasoActual > 0) {
      // Clear the data for the current step before moving back
      if (pasoActual === 1) {
        // Moving from step 1 (Select Barber) to step 0 (Select Service)
        useCitaStore.getState().setBarberoSeleccionado(null);
      } else if (pasoActual === 2) {
        // Moving from step 2 (Select Date/Time) to step 1 (Select Barber)
        useCitaStore.getState().setFechaSeleccionada(null);
        useCitaStore.getState().setHoraSeleccionada(null);
      }

      setPasoActual(pasoActual - 1);
      setErrorMessage(null);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          // Reset the store and local state when the modal is closed
          resetStore();
          setPasoActual(0);
          setErrorMessage(null);
        }
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">
          <span className="text-sm font-medium">Agendar Cita</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full flex-col sm:max-h-[80vh] sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{pasos[pasoActual].title}</DialogTitle>
          <DialogDescription>{pasos[pasoActual].description}</DialogDescription>
        </DialogHeader>
        {errorMessage && (
          <Alert variant="destructive" className="mt-1">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Contenido Principal y Resumen */}
        <div className="flex flex-grow overflow-hidden px-4 py-1">
          {/* Contenido de los Pasos (Desplazable) */}
          <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex-1 overflow-y-auto pr-4">
            {pasos[pasoActual].contenido}
          </div>

          {/* Resumen (Fijo) */}
          <Card className="w-80 flex-shrink-0 border p-4">
            <CardTitle className="text-lg">Resumen:</CardTitle>
            <CardContent className="p-0">
              {serviciosSeleccionados && serviciosSeleccionados.length > 0 && (
                <div className="mt-2">
                  <ul className="list-disc space-y-2">
                    {serviciosSeleccionados.map((servicio) => (
                      <li
                        key={servicio.id}
                        className="flex list-none items-center"
                      >
                        <div>
                          <p className="flex items-center">
                            <ShoppingBag className="mr-2 size-4" />
                            <strong>{servicio.tipo}</strong>
                          </p>
                          <div className="space-x-2">
                            <TypographySmall
                              text={formatQuetzales(servicio.precio).toString()}
                            />
                            <TypographySmall
                              text={`${minutos(servicio.tiempo.toString())} min`}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4">
                {barberoSeleccionado && (
                  <div className="flex items-center">
                    <UserCheck className="mr-2 size-4" />
                    <p className="font-semibold">
                      {barberoSeleccionado.usuario.nombres}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                {fechaSeleccionada && horaSeleccionada && (
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        <Clock className="mr-2 size-4" />
                        <p>
                          {format(fechaSeleccionada, "dd 'de' MMMM", {
                            locale: es,
                          })}
                        </p>
                      </div>
                      <TypographySmall text={`Hora: ${horaSeleccionada}`} />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer con Botones (Fijo) */}
        <DialogFooter className="flex-shrink-0">
          {pasoActual > 0 && (
            <Button type="button" variant="secondary" onClick={pasoAnterior}>
              Anterior
            </Button>
          )}
          <Button type="button" onClick={siguientePaso}>
            {pasoActual === pasos.length - 1 ? "Agendar" : "Siguiente"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
