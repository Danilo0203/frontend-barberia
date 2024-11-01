import { getServicios } from "@/lib/api/cita/servicios";
import { type ServicioData } from "@/types/servicios.type";
import { create } from "zustand";

interface ServiciosStore {
  servicios: ServicioData[];
  loading: boolean;
  error: boolean;
  dataServicios: () => Promise<void>;
}

export const useServiciosStore = create<ServiciosStore>()((set) => ({
  servicios: [],
  loading: true,
  error: false,
  dataServicios: async () => {
    const { data } = await getServicios();
    set({ servicios: data, loading: false, error: false });
  },
}));
