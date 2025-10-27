// src/app/core/services/cita-medica.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';


// ✅ Modelos de Citas
import {
  ItemCitaDTO,
  CrearCitaDTO,
  EditarCitaEstadoDTO,
  InformacionCitaDTO
} from '../models/cita-medica.model';

// ✅ Modelos de Resultados Médicos
import {
  ItemResultadoDTO,
  CrearResultadoDTO
} from '../models/resultado-medico.model';


@Injectable({ providedIn: 'root' })
export class CitaMedicaService {
  private apiUrl = `${environment.apiUrl}/citas`;
  private resultadosUrl = `${environment.apiUrl}/resultados`;

  constructor(private http: HttpClient) {}

  /** 🔹 Listar todas las citas */
  listar(): Observable<ItemCitaDTO[]> {
    return this.http.get<ItemCitaDTO[]>(this.apiUrl);
  }

  /** 🔹 Obtener una cita por ID */
  obtenerPorId(id: number | string): Observable<InformacionCitaDTO> {
    return this.http.get<InformacionCitaDTO>(`${this.apiUrl}/${id}`);
  }

  /** 🔹 Crear nueva cita
   *  (el backend enviará el correo automático al crearla)
   */
  crear(cita: CrearCitaDTO): Observable<ItemCitaDTO> {
    return this.http.post<ItemCitaDTO>(this.apiUrl, cita);
  }

  /** 🔹 Actualizar estado de una cita (confirmar, cancelar, etc.) */
  actualizarEstado(id: number | string, estado: string): Observable<ItemCitaDTO> {
    const body: EditarCitaEstadoDTO = { estado };
    return this.http.patch<ItemCitaDTO>(`${this.apiUrl}/${id}/estado`, body);
  }

  /** 🔹 Eliminar una cita */
  eliminar(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // -------------------------------
  // RESULTADOS MÉDICOS
  // -------------------------------

  /** 🔹 Listar todos los resultados médicos */
  listarResultados(): Observable<ItemResultadoDTO[]> {
    return this.http.get<ItemResultadoDTO[]>(this.resultadosUrl);
  }

  /** 🔹 Obtener resultados de una cita específica */
  obtenerResultadoPorCita(citaId: number | string): Observable<ItemResultadoDTO[]> {
    return this.http.get<ItemResultadoDTO[]>(`${this.resultadosUrl}/cita/${citaId}`);
  }

  /** 🔹 Crear nuevo resultado médico
   *  (el backend enviará el correo automático al crear el resultado)
   */
  crearResultado(dto: CrearResultadoDTO): Observable<ItemResultadoDTO> {
    return this.http.post<ItemResultadoDTO>(this.resultadosUrl, dto);
  }
}
