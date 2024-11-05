import api from "@/lib/api/axios";
import qs from "qs";
import { Horarios } from "@/types/calendario.types";

export const getCalendario = async (
  barberoId: string,
): Promise<{
  data: Horarios[];
  meta: any;
  message?: string;
}> => {
  const query = qs.stringify(
    {
      fields: ["id", "estado", "documentId"],
      filters: {
        documentId: barberoId,
      },
      populate: {
        dias_trabajos: {
          fields: ["id", "fecha_inicio", "fecha_final"],
        },
        horas_trabajos: {
          fields: ["id", "hora_inicio"],
        },
      },
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await api.get(`/barberos?${query}`);
    const { data, meta } = response.data;

    return { data, meta };
  } catch {
    return { data: [], meta: {}, message: "Error al obtener calendario" };
  }
};
