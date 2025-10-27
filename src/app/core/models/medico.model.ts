export interface ItemMedicoDTO {
  id: number;
  usuario_id: number;
  especialidad: string;
  numero_licencia: string;
  telefono: string;
}

export interface CrearMedicoDTO {
  usuario_id: number;          // Relación con la tabla usuarios
  especialidad: string;
  numero_licencia: string;
  telefono: string;
}

export interface EditarMedicoDTO {
  especialidad?: string;
  numero_licencia?: string;
  telefono?: string;
}

export interface InformacionMedicoDTO {
  id: number;
  usuario_id: number;
  especialidad: string;
  numero_licencia: string;
  telefono: string;
}
