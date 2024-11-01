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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TypographySmall } from "@/components/ui/TypographySmall";
import { Clock, Clock10Icon, ShoppingBag, UserCheck } from "lucide-react";

export function ModalAgendarCita() {
  const [pasoActual, setPasoActual] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const serviciosSeleccionados = useCitaStore(
    (state) => state.serviciosSeleccionados,
  );
  const barberoSeleccionado = useCitaStore(
    (state) => state.barberoSeleccionado,
  );
  const fechaSeleccionada = useCitaStore((state) => state.fechaSeleccionada);
  const horaSeleccionada = useCitaStore((state) => state.horaSeleccionada);

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
    {
      title: "Confirmación",
      description: "Revisa y confirma tu cita.",
      contenido: (
        <div>
          <p>Resumen de tu cita:</p>
          {/* Aquí puedes mostrar un resumen de los datos ingresados */}
        </div>
      ),
    },
  ];

  const siguientePaso = () => {
    if (pasoActual < pasos.length - 1) {
      // Validaciones basadas en el paso actual
      if (pasoActual < pasos.length - 1) {
        // Validaciones basadas en el paso actual
        if (pasoActual === 0) {
          // Paso 0: Validar que al menos un servicio esté seleccionado
          if (serviciosSeleccionados.length === 0) {
            setErrorMessage(
              "Por favor, selecciona al menos un servicio." as any,
            );
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
            setErrorMessage("Por favor, selecciona una fecha y hora." as any);
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

        console.log("Cita agendada", { servicios, barbero, fecha, hora });

        // Reiniciar el proceso o cerrar el modal
        setPasoActual(0);
        setErrorMessage(null);
      }
    }
  };
  const pasoAnterior = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
      setErrorMessage(null);
    }
  };

  const formatQuetzales = (precio: string | number | bigint) => {
    if (!precio) return 0;
    const precioNumerico = typeof precio === "string" ? Number(precio) : precio;
    return new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
    }).format(precioNumerico);
  };

  const minutos = (tiempo: string) => {
    if (!tiempo) return 0;
    const [horas, minutos] = tiempo?.split(":").map(Number);
    return horas * 60 + minutos;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <span className="text-sm font-medium">Agendar Cita</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full flex-col sm:max-w-[800px]">
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

        <div className="flex flex-grow flex-col-reverse items-start justify-start gap-8 px-4 py-1 md:flex-row">
          <div className="flex-1">{pasos[pasoActual].contenido}</div>
          <div className="h-full border p-4 md:flex-1">
            <h2 className="text-lg font-semibold">Resumen de tu selección:</h2>
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
                            text={`${minutos(servicio.tiempo.toString()).toString()} min`}
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
                  <p>{barberoSeleccionado.usuario.nombres}</p>
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
          </div>
        </div>
        <DialogFooter>
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
