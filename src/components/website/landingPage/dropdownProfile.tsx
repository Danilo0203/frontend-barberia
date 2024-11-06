"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ModalCitasCliente } from "../citas-cliente/ModalCitasCliente";

export const DropdownProfile = () => {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarFallback>{session!.user!.name?.[0]}</AvatarFallback>
          <AvatarImage
            src={session!.user!.image || ""}
            alt={session!.user!.name || "Avatar"}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>Perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col space-y-1">
          <DropdownMenuItem> {session?.user?.name} </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Correo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col space-y-1">
          <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Citas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col space-y-1">
          <ModalCitasCliente />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <Button variant="ghost" onClick={handleSignOut} className="w-full">
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
