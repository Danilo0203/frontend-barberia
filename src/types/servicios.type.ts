export interface ServiciosCita {
  data: ServicioData[];
  meta: Meta;
}

export interface ServicioData {
  id: number;
  documentId: string;
  nombre: string;
  descripcion: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  tipo_servicios: TipoServicio[];
}

export interface TipoServicio {
  id: number;
  documentId: string;
  tipo: string;
  precio: number;
  tiempo: number;
  message: string;
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
