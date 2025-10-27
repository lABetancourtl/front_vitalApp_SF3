import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CitaMedicaService } from '../../../../app/core/services/cita-medica.service';
import { MedicoService } from '../../../../app/core/services/medico.service';
import { CrearCitaDTO } from '../../../../app/core/models/cita-medica.model';
import { ItemMedicoDTO } from '../../../../app/core/models/medico.model';

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cita-form.component.html',
})
export class CitaFormComponent implements OnInit {
  cita: CrearCitaDTO = {
    paciente_id: 0,
    medico_id: 0,
    fecha_cita: '',
    motivo: ''
  };

  especialidades: string[] = [
    'Cardiología',
    'Pediatría',
    'Dermatología',
    'Ginecología',
    'Medicina General'
  ];

  especialidadSeleccionada = '';
  todosMedicos: ItemMedicoDTO[] = [];
  medicosFiltrados: ItemMedicoDTO[] = [];

  constructor(
    private citaService: CitaMedicaService,
    private medicoService: MedicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  /** 🔹 Obtener todos los médicos */
  cargarMedicos(): void {
    this.medicoService.listar().subscribe({
      next: (data) => { this.todosMedicos = data; },
      error: (err) => console.error('❌ Error cargando médicos:', err),
    });
  }

  /** 🔹 Filtrar médicos por especialidad seleccionada */
  cargarMedicosPorEspecialidad(): void {
    if (!this.especialidadSeleccionada) {
      this.medicosFiltrados = [];
      return;
    }

    this.medicosFiltrados = this.todosMedicos.filter(
      (m) => m.especialidad === this.especialidadSeleccionada
    );

    // Limpiar selección anterior
    this.cita.medico_id = 0;
  }

  /** 🔹 Enviar cita al backend */
  agendar(): void {
    if (
      !this.cita.paciente_id ||
      !this.cita.medico_id ||
      !this.cita.fecha_cita ||
      !this.cita.motivo
    ) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // (Opcional) Normaliza a ISO si tu backend lo requiere:
    // this.cita.fecha_cita = new Date(this.cita.fecha_cita).toISOString();

    this.citaService.crear(this.cita).subscribe({
      next: () => {
        alert('✅ Cita agendada exitosamente.');
        this.router.navigate(['/citas']);
      },
      error: (err) => {
        console.error('❌ Error al agendar cita:', err);
        alert('Error al agendar la cita');
      },
    });
  }
}
