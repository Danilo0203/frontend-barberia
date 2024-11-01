export interface CalendarioCitasProps {
  id: number;
  documentId: string;
  estado: string;
  horarios: Horarios;
}

export interface Horarios {
  id: number;
  documentId: string;
  dias_trabajos: DiasTrabajo[];
  horas_trabajos: HorasTrabajo[];
}

export interface DiasTrabajo {
  id: number;
  documentId: string;
  fecha_inicio: Date;
  fecha_final: Date;
}

export interface HorasTrabajo {
  id: number;
  documentId: string;
  hora_inicio: string;
}
