import { CreateCitaClienteProps } from "@/types/cita-clientes";
import api from "../axios";
import qs from "qs";

export const getCitasCliente = async (userId: number) => {
  const query = qs.stringify(
    {
      fields: ["documentId", "fecha", "hora"],
      filters: {
        usuario: {
          id: {
            $eq: userId, // Filtra las citas donde el usuario coincide con el ID proporcionado
          },
        },
      },
      populate: {
        barbero: {
          fields: ["documentId", "estado"],
          populate: {
            users_permissions_user: {
              fields: ["username", "email"], // Ajusta los campos que necesites
            },
          },
        },
        usuario: {
          fields: ["username", "email"], // Ajusta los campos que necesites
        },
        tipo_servicios: {
          fields: ["documentId", "tipo", "precio", "tiempo"],
        },
      },
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await api.get(`/citas-agendadas?${query}`);
    const { data } = response.data;
    return { data };
  } catch (error) {
    return { data: [], meta: {}, message: "Error al obtener servicios" };
  }
};

export const createCitaCliente = async (dataForm: CreateCitaClienteProps) => {
  try {
    const response = await api.post(`/citas-agendadas`, dataForm);
    const { data } = response.data;
    return { data };
  } catch (error) {
    return { data: [], meta: {}, message: "Error al crear cita cliente" };
  }
};

export const deleteCitaCliente = async (id: number) => {
  try {
    const response = await api.delete(`/citas-agendadas/${id}`);
    const { data } = response.data;
    return { data };
  } catch (error) {
    return { data: [], meta: {}, message: "Error al eliminar cita cliente" };
  }
};
