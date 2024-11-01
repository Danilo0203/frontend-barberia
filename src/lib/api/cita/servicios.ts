import { ServicioData } from "@/types/servicios.type";
import api from "../axios";
import qs from "qs";

export const getServicios = async () => {
  const query = qs.stringify(
    {
      fields: ["id", "nombre", "descripcion", "documentId"],
      populate: {
        tipo_servicios: {
          fields: ["id", "documentId", "tipo", "precio", "tiempo"],
        },
      },
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await api.get(`/servicios?${query}`);
    const { data, meta } = response.data;

    const servicios = data.map((servicio: ServicioData) => {
      const tipoServicios =
        servicio.tipo_servicios.length > 0
          ? servicio.tipo_servicios.map((tipo_servicio) => ({
              id: tipo_servicio.id,
              documentId: tipo_servicio.documentId,
              tipo: tipo_servicio.tipo,
              precio: tipo_servicio.precio,
              tiempo: tipo_servicio.tiempo,
            }))
          : [{ message: "No hay servicios disponibles" }];

      return {
        id: servicio.id,
        documentId: servicio.documentId,
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        tipo_servicios: tipoServicios,
      };
    });

    return { data: servicios, meta };
  } catch {
    return { data: [], meta: {}, message: "Error al obtener servicios" };
  }
};
