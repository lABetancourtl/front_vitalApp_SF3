import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ItemPacienteDTO,
  CrearPacienteDTO,
  EditarPacienteDTO,
  InformacionPacienteDTO
} from '../models/paciente.model';
import { environment } from '../../../environments/enviroment';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private apiUrl = `${environment.apiUrl}/pacientes`;

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todos los pacientes */
  listar(): Observable<ItemPacienteDTO[]> {
    console.log('API URL:', this.apiUrl); // Línea de depuración
    return this.http.get<ItemPacienteDTO[]>(this.apiUrl);
  }

  /** 🔹 Obtener un paciente por ID */
  obtenerPorId(id: number | string): Observable<InformacionPacienteDTO> {
    return this.http.get<InformacionPacienteDTO>(`${this.apiUrl}/${id}`);
  }

  /** 🔹 Crear un nuevo paciente */
  crear(paciente: CrearPacienteDTO): Observable<any> {
    return this.http.post(this.apiUrl, paciente);
  }

  /** 🔹 Editar un paciente existente */
  editar(id: number | string, paciente: EditarPacienteDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, paciente);
  }

  /** 🔹 Eliminar un paciente */
  eliminar(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
