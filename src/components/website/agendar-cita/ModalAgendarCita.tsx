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
import { User2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function ModalAgendarCita() {
  const [pasoActual, setPasoActual] = useState(0);
  const [error, setError] = useState(false);
  const serviciosSeleccionados = useCitaStore(
    (state) => state.serviciosSeleccionados,
  );
  const barberoSeleccionado = useCitaStore(
    (state) => state.barberoSeleccionado,
  );

  const fechaSeleccionada = useCitaStore((state) => state.fechaSeleccionada);
  const horaSeleccionada = useCitaStore((state) => state.horaSeleccionada);

  useEffect(() => {
    setError(false);
  }, [serviciosSeleccionados, barberoSeleccionado]);

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
      if (serviciosSeleccionados.length === 0) {
        setError(true);
      } else {
        setPasoActual(pasoActual + 1);
      }
    } else {
      // Lógica para enviar la información de la cita
      console.log("Cita agendada");
      // Puedes cerrar el modal o reiniciar el proceso
      setPasoActual(0);
    }
  };

  const pasoAnterior = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  const formatQuetzales = (precio: number) => {
    if (!precio) return 0; // Devuelve 0 si precio es undefined o null
    return new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
    }).format(precio);
  };
  const minutos = (tiempo: string) => {
    if (!tiempo) return 0; // Devuelve 0 si tiempo es undefined o una cadena vacía
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
        {error && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              No has seleccionado ningún servicio o barbero.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-grow items-start justify-start gap-8 p-6">
          <div className="flex-1">{pasos[pasoActual].contenido}</div>
          <div className="h-full flex-1 border p-4">
            {serviciosSeleccionados && serviciosSeleccionados.length > 0 ? (
              <div className="mt-2">
                <p>
                  <strong>Servicios Seleccionados:</strong>
                </p>
                <ul className="ml-5 list-disc">
                  {serviciosSeleccionados.map((servicio) => (
                    <li key={servicio.id}>
                      <p>
                        <strong>{servicio.tipo}</strong>
                      </p>
                      <p>
                        <strong>Precio:</strong>{" "}
                        {formatQuetzales(servicio.precio)}
                      </p>
                      <p>
                        <strong>Duración:</strong>{" "}
                        {minutos(servicio.tiempo.toString())} minutos
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No has seleccionado servicios.</p>
            )}
            <div className="mt-4">
              <p>
                <strong>Barbero Seleccionado:</strong>
              </p>
              {barberoSeleccionado ? (
                <div>
                  <p>{barberoSeleccionado.usuario.nombres}</p>
                </div>
              ) : (
                <p>No hay preferencia</p>
              )}
            </div>
            <div className="mt-4">
              <p>
                <strong>Fecha y Hora Seleccionadas:</strong>
              </p>
              {fechaSeleccionada && horaSeleccionada ? (
                <div>
                  <p>
                    {format(fechaSeleccionada, "dd 'de' MMMM, yyyy", {
                      locale: es,
                    })}
                  </p>
                  <p>Hora: {horaSeleccionada}</p>
                </div>
              ) : (
                <p>No has seleccionado fecha y hora.</p>
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
