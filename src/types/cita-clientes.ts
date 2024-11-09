export interface CitaClientesProps {
  data: DataCitaCliente[];
  meta: Meta;
}

export interface DataCitaCliente {
  id: number;
  documentId: string;
  barbero: Barbero;
  usuario: Usuario;
  tipo_servicios: TipoServicio[];
  fecha: string;
  hora: string;
}

export interface Barbero {
  id: number;
  documentId: string;
  estado: boolean;
  users_permissions_user: Usuario;
}

export interface Usuario {
  id: number;
  documentId: string;
  username: string;
  email: string;
}

export interface TipoServicio {
  id: number;
  documentId: string;
  tipo: string;
  precio: number;
  tiempo: string;
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

export interface CreateCitaClienteProps {
  data: Data;
}

export interface Data {
  usuario: number | string | undefined;
  tipo_servicios: number[];
  barbero: number | undefined;
  fecha: Date;
  hora: string;
}
