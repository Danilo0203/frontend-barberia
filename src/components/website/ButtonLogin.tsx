"use client";

import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export const ButtonLogin = () => {
  return (
    <Button
      variant="default"
      className="w-full sm:w-auto"
      onClick={() => {
        signIn("google");
      }}
    >
      Iniciar Sesión
    </Button>
  );
};
