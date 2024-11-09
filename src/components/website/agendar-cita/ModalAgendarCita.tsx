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
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { TypographySmall } from "@/components/ui/TypographySmall";
import { Clock, ShoppingBag, UserCheck } from "lucide-react";
import { formatQuetzales, minutos } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useRouter } from "next/navigation";
import { createCitaCliente } from "@/lib/api/cita/clientes-cita";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function ModalAgendarCita() {
  const [pasoActual, setPasoActual] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const route = useRouter();
  const serviciosSeleccionados = useCitaStore(
    (state) => state.serviciosSeleccionados,
  );
  const barberoSeleccionado = useCitaStore(
    (state) => state.barberoSeleccionado,
  );
  const fechaSeleccionada = useCitaStore((state) => state.fechaSeleccionada);
  const horaSeleccionada = useCitaStore((state) => state.horaSeleccionada);
  const resetStore = useCitaStore((state) => state.reset);
  const { toast } = useToast();

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
      if (pasoActual === 0) {
        if (serviciosSeleccionados.length === 0) {
          setErrorMessage("Por favor, selecciona al menos un servicio.");
        } else {
          setPasoActual(pasoActual + 1);
          setErrorMessage(null);
        }
      } else if (pasoActual === 1) {
        setPasoActual(pasoActual + 1);
        setErrorMessage(null);
      }
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
  const agendarCita = async () => {
    if (!fechaSeleccionada || !horaSeleccionada) {
      setErrorMessage("Por favor, selecciona una fecha y hora.");
      return;
    }

    try {
      const dataForm = {
        data: {
          usuario: session?.user.userId,
          tipo_servicios: serviciosSeleccionados.map((servicio) => servicio.id),
          barbero: barberoSeleccionado?.id,
          fecha: fechaSeleccionada,
          hora: format(
            parse(horaSeleccionada, "h:mm a", new Date()),
            "HH:mm:ss.SSS",
          ),
        },
      };

      const response = await createCitaCliente(dataForm);

      if (response.data) {
        resetStore();
        setPasoActual(0);
        setErrorMessage(null);
        setOpen(false);
        toast({
          title: "Cita creada",
          description: `Se agendo la cita el dia ${format(
            fechaSeleccionada,
            "dd 'de' MMMM",
            {
              locale: es,
            },
          )} a las ${horaSeleccionada}`,
          action: <ToastAction altText="Ok">Aceptar</ToastAction>,
        });
        route.back();
      } else {
        setErrorMessage("Error al crear la cita. Inténtalo de nuevo.");
      }
    } catch (error) {
      setErrorMessage("Error al crear la cita. Inténtalo de nuevo.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetStore();
          setPasoActual(0);
          setErrorMessage(null);
        }
        setOpen(isOpen);
        if (isOpen) {
          route.push("/");
        } else {
          route.back();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">
          <span className="text-sm font-medium">Agendar Cita</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full flex-col sm:max-h-[80vh] sm:max-w-[800px]">
        {status === "unauthenticated" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Agendar Cita
              </DialogTitle>
            </DialogHeader>
            <div className="mt-6 space-y-6">
              <Alert
                variant="destructive"
                className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
              >
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertDescription>
                  Inicie sesión para acceder a reservar citas.
                </AlertDescription>
              </Alert>
              <div className="flex flex-col items-center justify-center gap-4 px-4 py-6 sm:flex-row sm:gap-8">
                <Button
                  variant="default"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    signIn("google", {
                      redirectTo: "/",
                    });
                  }}
                >
                  Iniciar Sesión
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{pasos[pasoActual].title}</DialogTitle>
              <DialogDescription>
                {pasos[pasoActual].description}
              </DialogDescription>
            </DialogHeader>
            {errorMessage && (
              <Alert variant="destructive" className="mt-1">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Contenido Principal y Resumen */}
            <div className="flex flex-grow flex-col-reverse overflow-hidden px-4 py-1 md:flex-row">
              {/* Contenido de los Pasos (Desplazable) */}
              <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex-1 overflow-y-auto md:pr-4">
                {pasos[pasoActual].contenido}
              </div>

              {/* Resumen desktop */}
              <Card className="hidden w-80 flex-shrink-0 border p-4 sm:block">
                <CardTitle className="text-lg">Resumen:</CardTitle>
                <CardContent className="p-0">
                  {serviciosSeleccionados &&
                    serviciosSeleccionados.length > 0 && (
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
                                    text={formatQuetzales(
                                      servicio.precio,
                                    ).toString()}
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
              {/* Resumen mobile */}
              <Accordion type="single" collapsible className="w-full sm:hidden">
                <AccordionItem value="resumen">
                  <AccordionTrigger>Resumen</AccordionTrigger>
                  <AccordionContent>
                    {serviciosSeleccionados &&
                      serviciosSeleccionados.length > 0 && (
                        <div className="mt-2">
                          <ul className="space-y-2">
                            {serviciosSeleccionados.map((servicio) => (
                              <li
                                key={servicio.id}
                                className="flex items-center"
                              >
                                <div>
                                  <p className="flex items-center">
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    <strong>{servicio.tipo}</strong>
                                  </p>
                                  <div className="space-x-2">
                                    <TypographySmall
                                      text={formatQuetzales(
                                        servicio.precio,
                                      ).toString()}
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
                          <UserCheck className="mr-2 h-4 w-4" />
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
                              <Clock className="mr-2 h-4 w-4" />
                              <p>
                                {format(fechaSeleccionada, "dd 'de' MMMM", {
                                  locale: es,
                                })}
                              </p>
                            </div>
                            <TypographySmall
                              text={`Hora: ${horaSeleccionada}`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Footer con Botones (Fijo) */}
            <DialogFooter className="flex-shrink-0">
              {pasoActual > 0 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={pasoAnterior}
                >
                  Anterior
                </Button>
              )}
              {pasoActual < pasos.length - 1 && (
                <Button
                  type="button"
                  className="mb-4 md:mb-0"
                  onClick={siguientePaso}
                >
                  Siguiente
                </Button>
              )}
              {pasoActual === pasos.length - 1 && (
                <Button
                  type="button"
                  className="mb-4 md:mb-0"
                  onClick={agendarCita}
                >
                  Agendar
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
