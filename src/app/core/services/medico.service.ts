import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import {
  ItemMedicoDTO,
  CrearMedicoDTO,
  EditarMedicoDTO,
  InformacionMedicoDTO
} from '../models/medico.model';


@Injectable({ providedIn: 'root' })
export class MedicoService {
  private apiUrl = `${environment.apiUrl}/medicos`;

  constructor(private http: HttpClient) {}

  /** Listar todos los médicos */
  listar(): Observable<ItemMedicoDTO[]> {
    return this.http.get<ItemMedicoDTO[]>(this.apiUrl);
  }

  /** Obtener un médico por ID */
  obtenerPorId(id: number | string): Observable<InformacionMedicoDTO> {
    return this.http.get<InformacionMedicoDTO>(`${this.apiUrl}/${id}`);
  }

  /** Crear un nuevo médico */
  crear(medico: CrearMedicoDTO): Observable<any> {
    return this.http.post(this.apiUrl, medico);
  }

  /** Editar un médico existente (si agregas PUT en el backend más adelante) */
  editar(id: number | string, medico: EditarMedicoDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, medico);
  }

  /** Eliminar un médico */
  eliminar(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
