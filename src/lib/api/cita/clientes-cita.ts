import api from "../axios";
import qs from "qs";

export const getCitasCliente = async (userId: number) => {
  const query = qs.stringify(
    {
      fields: ["documentId"],
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
