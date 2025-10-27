import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../../app/core/services/usuario.service';
import { Usuario } from '../../../../app/core/models/usuario.model';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  templateUrl: './usuario-list.component.html',
  imports: [CommonModule, RouterLink],
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  cargando = true;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar usuarios:', err);
        this.cargando = false;
      }
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => this.ngOnInit(),
        error: (err) => console.error('❌ Error al eliminar usuario:', err)
      });
    }
  }
}
