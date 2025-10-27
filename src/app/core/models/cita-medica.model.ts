// src/app/core/models/cita-medica.model.ts

export interface ItemCitaDTO {
  id: number;
  paciente_id: number;
  medico_id: number;
  fecha_cita: string;
  motivo: string;
  estado: string;
}

export interface CrearCitaDTO {
  paciente_id: number;
  medico_id: number;
  fecha_cita: string; // 'YYYY-MM-DD HH:mm' o ISO
  motivo: string;
  // ❌ sin 'destinatarios': los correos los resuelve el backend
}

export interface EditarCitaEstadoDTO {
  estado: string;
}

export interface InformacionCitaDTO {
  id: number;
  paciente_id: number;
  medico_id: number;
  fecha_cita: string;
  motivo: string;
  estado: string;
}
