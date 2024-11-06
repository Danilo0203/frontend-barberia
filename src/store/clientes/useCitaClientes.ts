import { getCitasCliente } from "@/lib/api/cita/clientes-cita";
import { create } from "zustand";

interface CitaClientes {
  data: any[];
  loading: boolean;
  error: boolean;
  getCitasCliente: (idUser: number) => Promise<void>;
}

export const useCitaClientesStore = create<CitaClientes>()((set) => ({
  data: [],
  loading: true,
  error: false,
  getCitasCliente: async (idUser: number) => {
    set({ loading: true, error: false });
    try {
      const response = await getCitasCliente(idUser);
      set({ data: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching calendario:", error);
      set({ loading: false, error: true });
    }
  },
}));
