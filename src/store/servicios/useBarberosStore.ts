import { getBarberos } from "@/lib/api/cita/barberos";
import { type DataBarbero } from "@/types/barberos.type";

import { create } from "zustand";

interface BarberoStore {
  barberos: DataBarbero[];
  loading: boolean;
  error: boolean;
  dataBarberos: () => Promise<void>;
}

export const useBarberosStore = create<BarberoStore>()((set) => ({
  barberos: [],
  loading: true,
  error: false,
  dataBarberos: async () => {
    await getBarberos()
      .then((res) => {
        set({ barberos: res, loading: false, error: false });
      })
      .catch((error) => {
        console.log("catch: ", error);
        set({ barberos: [], loading: false, error: true });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
