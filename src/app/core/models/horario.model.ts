export interface ItemHorarioDTO {
  id: number;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

export interface CrearHorarioDTO {
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}
