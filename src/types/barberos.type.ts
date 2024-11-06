export interface BarberosCita {
  data: DataBarbero[];
  meta: Meta;
}

export interface DataBarbero {
  id: number;
  documentId: string;
  estado: boolean;
  usuario: Usuario;
  users_permissions_user: Usuario;
}

export interface Usuario {
  id: number;
  documentId: string;
  nombres: string;
  username: string;
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
