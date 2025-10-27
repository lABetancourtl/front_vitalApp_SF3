import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../../app/core/services/usuario.service';
import { Usuario } from '../../../../app/core/models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  templateUrl: './usuario-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class UsuarioFormComponent implements OnInit {
  form!: FormGroup;
  usuarioId?: number;
  titulo = 'Nuevo Usuario';
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: [''],
      rol: ['paciente', Validators.required]
    });

    // Verificamos si hay un ID en la ruta (modo edición)
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.usuarioId = Number(idParam);
      this.titulo = 'Editar Usuario';
      this.cargarUsuario();
    }
  }

  cargarUsuario(): void {
    this.cargando = true;
    this.usuarioService.getUsuarioById(this.usuarioId!).subscribe({
      next: (usuario) => {
        this.form.patchValue({
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol
        });
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar usuario:', err);
        this.cargando = false;
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const usuario: Usuario = this.form.value;
    this.cargando = true;

    if (this.usuarioId) {
      // 🔹 Actualizar usuario existente
      this.usuarioService.actualizarUsuario(this.usuarioId, usuario).subscribe({
        next: () => {
          alert('✅ Usuario actualizado correctamente');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('❌ Error al actualizar usuario:', err);
          this.cargando = false;
        }
      });
    } else {
      // 🔹 Crear nuevo usuario
      this.usuarioService.crearUsuario(usuario).subscribe({
        next: () => {
          alert('✅ Usuario creado correctamente');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('❌ Error al crear usuario:', err);
          this.cargando = false;
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
