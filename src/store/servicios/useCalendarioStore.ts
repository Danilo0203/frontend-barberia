import { getCalendario } from "@/lib/api/cita/calendario";
import { Horarios } from "@/types/calendario.types";
import { create } from "zustand";

interface CalendarioStore {
  calendario: Horarios | null;
  loading: boolean;
  error: boolean;
  getCalendario: (id: string) => Promise<void>;
}

export const useCalendarioStore = create<CalendarioStore>()((set) => ({
  calendario: null,
  loading: true,
  error: false,
  getCalendario: async (documentId) => {
    set({ loading: true, error: false });
    try {
      const response = await getCalendario(documentId);
      set({ calendario: response.data[0], loading: false });
    } catch (error) {
      console.error("Error fetching calendario:", error);
      set({ loading: false, error: true });
    }
  },
}));
