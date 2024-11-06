import { create } from "zustand";
import { persist } from "zustand/middleware";

type TipoServicio = {
  id: number;
  documentId: string;
  tipo: string;
  precio: number;
  tiempo: number;
  message: string;
};
interface Barbero {
  id: number;
  documentId: string;
  estado: string;
  usuario: {
    id: number;
    documentId: string;
    nombres: string;
  };
}

interface CitaStore {
  serviciosSeleccionados: TipoServicio[];
  addServicioSeleccionado: (servicio: TipoServicio) => void;
  removeServicioSeleccionado: (servicioId: number) => void;
  barberoSeleccionado: Barbero | null;
  setBarberoSeleccionado: (barbero: Barbero | null) => void;
  fechaSeleccionada: Date | null;
  setFechaSeleccionada: (fecha: Date | null) => void;
  horaSeleccionada: string | null;
  setHoraSeleccionada: (hora: string | null) => void;
  reset: () => void; // Add this line
}

export const useCitaStore = create<CitaStore>()(
  persist(
    (set) => ({
      serviciosSeleccionados: [],
      addServicioSeleccionado: (servicio) =>
        set((state) => ({
          serviciosSeleccionados: [...state.serviciosSeleccionados, servicio],
        })),
      removeServicioSeleccionado: (servicioId) =>
        set((state) => ({
          serviciosSeleccionados: state.serviciosSeleccionados.filter(
            (servicio) => servicio.id !== servicioId,
          ),
        })),
      barberoSeleccionado: null,
      setBarberoSeleccionado: (barbero) =>
        set({ barberoSeleccionado: barbero }),
      fechaSeleccionada: null,
      setFechaSeleccionada: (fecha) => set({ fechaSeleccionada: fecha }),
      horaSeleccionada: null,
      setHoraSeleccionada: (hora) => set({ horaSeleccionada: hora }),
      reset: () =>
        // Add this function
        set({
          serviciosSeleccionados: [],
          barberoSeleccionado: null,
          fechaSeleccionada: null,
          horaSeleccionada: null,
        }),
    }),
    {
      name: "cita-storage",
    },
  ),
);
