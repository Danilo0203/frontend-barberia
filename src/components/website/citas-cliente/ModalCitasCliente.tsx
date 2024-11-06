"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCitaClientesStore } from "@/store/clientes/useCitaClientes";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

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
        <Button variant="outline">Citas</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Citas</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <pre> {JSON.stringify(data, null, 2)}</pre>
        </div>
      </DialogContent>
    </Dialog>
  );
};
