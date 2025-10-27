import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ necesario para ngModel y ngForm
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { PacienteService } from '../../../../app/core/services/paciente.service';
import { CrearPacienteDTO, EditarPacienteDTO } from '../../../../app/core/models/paciente.model';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './paciente-form.component.html',
})
export class PacienteFormComponent implements OnInit {
  pacienteId?: number;
  modoEdicion = false; // ✅ ahora existe
  cargando = false;

  // ✅ Objeto que usa ngModel en el HTML
  paciente: CrearPacienteDTO = {
    usuario_id: 0,
    documento: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    genero: 'M',
  };

  constructor(
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.pacienteId = Number(idParam);
      this.modoEdicion = true;
      this.cargarPaciente();
    }
  }

  cargarPaciente(): void {
    if (!this.pacienteId) return;
    this.cargando = true;

    this.pacienteService.obtenerPorId(this.pacienteId).subscribe({
      next: (data) => {
        this.paciente = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar paciente:', err);
        this.cargando = false;
      },
    });
  }

  guardar(): void {
    this.cargando = true;

    if (this.modoEdicion && this.pacienteId) {
      const dto: EditarPacienteDTO = {
        telefono: this.paciente.telefono,
        direccion: this.paciente.direccion,
        fecha_nacimiento: this.paciente.fecha_nacimiento,
        genero: this.paciente.genero,
      };

      this.pacienteService.editar(this.pacienteId, dto).subscribe({
        next: () => {
          alert('✅ Paciente actualizado correctamente');
          this.router.navigate(['/pacientes']);
        },
        error: (err) => {
          console.error('❌ Error al actualizar paciente:', err);
          this.cargando = false;
        },
      });
    } else {
      this.pacienteService.crear(this.paciente).subscribe({
        next: () => {
          alert('✅ Paciente creado correctamente');
          this.router.navigate(['/pacientes']);
        },
        error: (err) => {
          console.error('❌ Error al crear paciente:', err);
          this.cargando = false;
        },
      });
    }
  }
}
