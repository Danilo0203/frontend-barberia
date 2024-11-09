"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCitaClientesStore } from "@/store/clientes/useCitaClientes";
import { Calendar1, Clock, Scissors, Trash2, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { formatQuetzales, minutos } from "../../../lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const ModalCitasCliente = () => {
  const [isOpen, setIsOpen] = useState(false);
  const getCitas = useCitaClientesStore((state) => state.getCitasCliente);
  const data = useCitaClientesStore((state) => state.data);
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user?.userId) {
      return;
    }
    getCitas(session?.user?.userId);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Ver Citas Agendadas</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Citas Agendadas</DialogTitle>
          <DialogDescription>
            Gestiona tus citas programadas con nuestros barberos
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[60vh] pr-4">
          {data.length > 0 ? (
            <div className="grid gap-4 pb-4 md:grid-cols-2 lg:grid-cols-3">
              {data.map(({ barbero, tipo_servicios, id, fecha, hora }) => {
                const parsedHora = parse(hora, "HH:mm:ss", new Date());
                const formattedHora = format(parsedHora, "hh:mm a");
                const total = tipo_servicios.reduce(
                  (sum, service) => sum + service.precio,
                  0,
                );

                return (
                  <Card key={id} className="flex flex-col border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <User className="size-5" />
                        {barbero.users_permissions_user.username}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar1 className="size-4" />
                          {format(new Date(fecha), "dd 'de' MMM", {
                            locale: es,
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-4" />
                          {formattedHora}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                      <div>
                        <h4 className="mb-2 font-medium">
                          Servicios Reservados
                        </h4>
                        <div className="space-y-3">
                          {tipo_servicios.map((servicio) => (
                            <div
                              key={servicio.id}
                              className="flex items-start justify-between gap-4 rounded-lg bg-muted/50 p-2"
                            >
                              <div className="flex items-center gap-2">
                                <Scissors className="size-4" />
                                <span>{servicio.tipo}</span>
                              </div>
                              <div className="text-right text-sm text-muted-foreground">
                                <div>{formatQuetzales(servicio.precio)}</div>
                                <div>
                                  {minutos(servicio.tiempo.toString())} min
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-medium">
                        <span>Total</span>
                        <span>{formatQuetzales(total)}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="destructive"
                        className="ml-auto flex gap-2"
                        size="sm"
                      >
                        <Trash2 className="size-4" />
                        Eliminar Cita
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
              <p className="text-lg font-medium">No hay citas disponibles</p>
              <p className="text-sm text-muted-foreground">
                Las citas que agendes aparecerán aquí
              </p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
