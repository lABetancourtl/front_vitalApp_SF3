import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MedicoService } from '../../../../app/core/services/medico.service';
import {
  CrearMedicoDTO,
  EditarMedicoDTO,
  InformacionMedicoDTO
} from '../../../../app/core/models/medico.model';

@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './medico-form.component.html',
})
export class MedicoFormComponent implements OnInit {
  modoEdicion = false;
  idMedico?: number;

  medico: CrearMedicoDTO = {
    usuario_id: 0,
    especialidad: '',
    numero_licencia: '',
    telefono: ''
  };

  especialidades: string[] = [
    'Cardiología',
    'Pediatría',
    'Dermatología',
    'Ginecología',
    'Medicina General'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicoService: MedicoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idMedico = Number(idParam);
      this.modoEdicion = true;
      this.cargarMedico();
    }
  }

  cargarMedico(): void {
    if (!this.idMedico) return;
    this.medicoService.obtenerPorId(this.idMedico).subscribe({
      next: (data: InformacionMedicoDTO) => {
        this.medico = {
          usuario_id: data.usuario_id,
          especialidad: data.especialidad,
          numero_licencia: data.numero_licencia,
          telefono: data.telefono
        };
      },
      error: (err) => console.error('❌ Error cargando médico:', err)
    });
  }

  guardar(): void {
    if (!this.medico.usuario_id) {
      alert('El usuario_id es obligatorio');
      return;
    }

    if (this.modoEdicion && this.idMedico) {
      const dto: EditarMedicoDTO = {
        especialidad: this.medico.especialidad,
        numero_licencia: this.medico.numero_licencia,
        telefono: this.medico.telefono
      };

      this.medicoService.editar(this.idMedico, dto).subscribe({
        next: () => {
          alert('✅ Médico actualizado correctamente');
          this.router.navigate(['/medicos']);
        },
        error: (err) => {
          console.error('❌ Error al actualizar médico:', err);
          alert('Error al actualizar médico');
        }
      });
    } else {
      this.medicoService.crear(this.medico).subscribe({
        next: () => {
          alert('✅ Médico creado correctamente');
          this.router.navigate(['/medicos']);
        },
        error: (err) => {
          console.error('❌ Error al crear médico:', err);
          alert('Error al crear médico');
        }
      });
    }
  }
}
