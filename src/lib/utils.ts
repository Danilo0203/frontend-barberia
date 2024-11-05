import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatQuetzales = (precio: string | number | bigint) => {
  if (!precio) return 0;
  const precioNumerico = typeof precio === "string" ? Number(precio) : precio;
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(precioNumerico);
};

export const minutos = (tiempo: string) => {
  if (!tiempo) return 0;
  const [horas, minutos] = tiempo?.split(":").map(Number);
  return horas * 60 + minutos;
};
