import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';
import { ItemHorarioDTO, CrearHorarioDTO } from '../models/horario.model';

@Injectable({ providedIn: 'root' })
export class HorarioMedicoService {
  private apiUrl = `${environment.apiUrl}/horarios`;

  constructor(private http: HttpClient) {}

  listar(): Observable<ItemHorarioDTO[]> {
    return this.http.get<ItemHorarioDTO[]>(this.apiUrl);
  }

  listarPorMedico(idMedico: number): Observable<ItemHorarioDTO[]> {
    return this.http.get<ItemHorarioDTO[]>(`${this.apiUrl}/medico/${idMedico}`);
  }

  crear(horario: CrearHorarioDTO, idMedico: number): Observable<ItemHorarioDTO> {
    return this.http.post<ItemHorarioDTO>(`${this.apiUrl}/medico/${idMedico}`, horario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
