export interface CalendarioCitasProps {
  data: Horarios[];
  meta: Meta;
}

export interface Horarios {
  id: number;
  documentId: string;
  estado: string;
  barbero: Barbero;
}

export interface Barbero {
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

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
