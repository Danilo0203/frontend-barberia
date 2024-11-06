import { type DataBarbero } from "@/types/barberos.type";
import api from "../axios";
import qs from "qs";

export const getBarberos = async () => {
  const query = qs.stringify(
    {
      fields: ["id", "estado", "documentId"],
      populate: {
        users_permissions_user: {
          fields: ["id", "documentId", "username"],
        },
      },
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await api.get(`/barberos?${query}`);
    const { data } = response.data;
    const barberos = data.map(
      ({ id, documentId, estado, users_permissions_user }: DataBarbero) => {
        return {
          id,
          documentId,
          estado,
          usuario: {
            id: users_permissions_user.id,
            documentId: users_permissions_user.documentId,
            nombres: users_permissions_user.username,
          },
        };
      },
    );

    return barberos;
  } catch {
    return { data: [], meta: {}, message: "Error al obtener Barberos" };
  }
};

// export const getBarberosCalendario = async () => {
//   const query = qs.stringify(
//     {
//       fields: ["id", "estado", "documentId"],
//       filters: {
//         usuario: {
//           $and: [{ rol: { nombre: { $eq: "BARBERO" } } }],
//         },
//       },
//       populate: {
//         usuario: {
//           populate: {
//             rol: {
//               fields: ["id", "nombre"],
//             },
//           },
//           fields: ["id", "nombres"],
//         },
//         dias_trabajos: {
//           fields: ["id", "fecha_inicio", "fecha_final"],
//           populate: {
//             horas_trabajos: {
//               fields: ["id", "hora_inicio"],
//             },
//           },
//         },
//       },
//     },
//     { encodeValuesOnly: true },
//   );

//   try {
//     const response = await api.get(`/barberos?${query}`);
//     const { data } = response.data;

//     const barberos = data.map(
//       ({ id, documentId, estado, usuario }: DataBarbero) => {
//         return {
//           id,
//           documentId,
//           estado,
//           usuario: {
//             id: usuario.id,
//             documentId: usuario.documentId,
//             nombres: usuario.nombres,
//             rol: {
//               id: usuario.rol.id,
//               documentId: usuario.rol.documentId,
//               nombre: usuario.rol.nombre,
//             },
//           },
//         };
//       },
//     );

//     return barberos;
//   } catch {
//     return { data: [], meta: {}, message: "Error al obtener Barberos" };
//   }
// };
