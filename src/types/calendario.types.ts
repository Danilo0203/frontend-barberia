export interface CalendarioCitas {
  data: Horarios[];
  meta: Meta;
}

export interface Horarios {
  id: number;
  documentId: string;
  estado: boolean;
  usuario: Usuario;
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

export interface Usuario {
  id: number;
  documentId: string;
  nombres: string;
  rol: Rol;
}

export interface Rol {
  id: number;
  documentId: string;
  nombre: string;
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
