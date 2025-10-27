import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CrearResultadoDTO,
  ItemResultadoDTO
} from '../models/resultado-medico.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ResultadoMedicoService {
  private apiUrl = `${environment.apiUrl}/resultados`;

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todos los resultados médicos */
  listar(): Observable<ItemResultadoDTO[]> {
    return this.http.get<ItemResultadoDTO[]>(this.apiUrl);
  }

  /** 🔹 Obtener resultados por cita */
  obtenerPorCita(citaId: number | string): Observable<ItemResultadoDTO[]> {
    return this.http.get<ItemResultadoDTO[]>(`${this.apiUrl}/${citaId}`);
  }

  /** 🔹 Crear un nuevo resultado médico */
  crear(dto: CrearResultadoDTO): Observable<ItemResultadoDTO> {
    return this.http.post<ItemResultadoDTO>(this.apiUrl, dto);
  }
}
