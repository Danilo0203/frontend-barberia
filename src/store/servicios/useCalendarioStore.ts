import { getCalendario } from "@/lib/api/cita/calendario";
import { CalendarioCitasProps } from "@/types/calendario.types";
import { create } from "zustand";

interface CalendarioStore {
  calendario: CalendarioCitasProps[];
  loading: boolean;
  error: boolean;
  getCalendario: (id: string) => Promise<void>;
}

export const useCalendarioStore = create<CalendarioStore>()((set) => ({
  calendario: [],
  loading: true,
  error: false,
  getCalendario: async (id) => {
    const { data } = await getCalendario(id);
    set({ calendario: data, loading: false, error: false });
  },
}));
