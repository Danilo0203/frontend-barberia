import { ServicioData } from "@/types/servicios.type";
import api from "../axios";
import qs from "qs";
import { CalendarioCitasProps, Horarios } from "@/types/calendario.types";

export const getCalendario = async (
  barberoId: string
): Promise<{
  data: CalendarioCitasProps[];
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

    const calendario = data.map((cita: Horarios) => {
      return {
        id: cita.id,
        documentId: cita.documentId,
        horarios: {
          id: cita.id,
          documentId: cita.documentId,
          dias_trabajos: cita.dias_trabajos,
          horas_trabajos: cita.horas_trabajos,
        },
      };
    });

    return { data: calendario, meta };
  } catch {
    return { data: [], meta: {}, message: "Error al obtener calendario" };
  }
};
