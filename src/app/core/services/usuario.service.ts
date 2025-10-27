import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';

// Modelo de datos (ajústalo si tienes una interfaz Usuario en /models)
export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  password?: string;
  rol?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/pacientes`; 

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener todos los usuarios */
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  /** 🔹 Obtener un usuario por su ID */
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  /** 🔹 Crear un nuevo usuario */
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  /** 🔹 Actualizar un usuario existente */
  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  /** 🔹 Eliminar un usuario */
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
