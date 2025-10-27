// Modelo alineado con el backend Node.js (Express + PostgreSQL)

export interface ItemResultadoDTO {
  id: number;
  cita_id: number;             // 🔹 Relación con la cita médica
  descripcion: string;         // 🔹 Descripción del resultado
  archivo_url: string;         // 🔹 Ruta o URL del archivo (PDF, imagen, etc.)
  fecha_resultado: string;     // 🔹 Fecha de registro (ISO string)
}

export interface CrearResultadoDTO {
  cita_id: number;             // 🔹 ID de la cita asociada
  descripcion: string;         // 🔹 Descripción del resultado
  archivo_url: string;         // 🔹 Archivo adjunto (puede ser URL o path)
}
