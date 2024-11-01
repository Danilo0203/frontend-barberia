import api from "@/lib/api/axios";
import qs from "qs";
import { CalendarioCitasProps, Horarios } from "@/types/calendario.types";

export const getCalendario = async (
  barberoId: string
): Promise<{
  data: Horarios[];
  meta: any;
  message?: string;
}> => {
  const query = qs.stringify(
    {
      fields: ["id", "estado"],
      filters: {
        barbero: { documentId: barberoId },
      },
      populate: {
        barbero: {
          fields: ["id", "documentId"],
          populate: {
            dias_trabajos: {
              fields: ["fecha_inicio", "fecha_final"], // solo los campos específicos
            },
            horas_trabajos: {
              fields: ["hora_inicio"], // campo específico para horas_trabajos
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  try {
    const response = await api.get(`/citas?${query}`);
    const { data, meta } = response.data;

    return { data, meta };
  } catch {
    return { data: [], meta: {}, message: "Error al obtener calendario" };
  }
};
