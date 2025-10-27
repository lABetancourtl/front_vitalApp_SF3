import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MedicoService } from '../../../../app/core/services/medico.service';
import { ItemMedicoDTO } from '../../../../app/core/models/medico.model';

@Component({
  selector: 'app-medico-list',
  standalone: true,
  templateUrl: './medico-list.component.html',
  imports: [CommonModule, RouterLink],
})
export class MedicoListComponent implements OnInit {
  medicos: ItemMedicoDTO[] = [];
  cargando = true;

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  /** 🔹 Obtener lista de médicos */
  cargarMedicos(): void {
    this.cargando = true;
    this.medicoService.listar().subscribe({
      next: (data) => {
        this.medicos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error cargando médicos:', err);
        this.cargando = false;
      },
    });
  }

  /** 🔹 Eliminar médico */
  eliminarMedico(id: number | string): void {
    if (confirm('¿Deseas eliminar este médico?')) {
      this.medicoService.eliminar(id).subscribe({
        next: () => {
          alert('✅ Médico eliminado correctamente');
          this.cargarMedicos();
        },
        error: (err) => console.error('❌ Error al eliminar médico:', err),
      });
    }
  }
}
