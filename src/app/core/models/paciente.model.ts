// Modelo 100% sincronizado con el backend Node.js (Express + PostgreSQL)

export interface ItemPacienteDTO {
  id: number;
  usuario_id: number;
  documento: string;
  telefono: string;
  direccion: string;
  fecha_nacimiento: string;
  genero: string;
}

export interface CrearPacienteDTO {
  usuario_id: number;           // ID del usuario asociado
  documento: string;
  telefono: string;
  direccion: string;
  fecha_nacimiento: string;     // formato ISO: 'YYYY-MM-DD'
  genero: string;               // 'M' | 'F' | 'O'
}

export interface EditarPacienteDTO {
  telefono?: string;
  direccion?: string;
  fecha_nacimiento?: string;
  genero?: string;
}

export interface InformacionPacienteDTO {
  id: number;
  usuario_id: number;
  documento: string;
  telefono: string;
  direccion: string;
  fecha_nacimiento: string;
  genero: string;
}
