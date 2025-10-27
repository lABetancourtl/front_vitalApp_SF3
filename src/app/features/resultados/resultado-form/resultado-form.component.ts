import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ResultadoMedicoService } from '../../../core/services/resultado-medico.service';
import { Router } from '@angular/router';
import { CrearResultadoDTO } from '../../../core/models/resultado-medico.model';

@Component({
  selector: 'app-resultado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resultado-form.component.html',
})
export class ResultadoFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resultadoService: ResultadoMedicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cita_id: [null, Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
      archivo_url: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = this.form.value as CrearResultadoDTO;

    this.resultadoService.crear(dto).subscribe({
      next: () => {
        alert('✅ Resultado médico registrado correctamente');
        this.router.navigate(['/resultados']);
      },
      error: (err) => {
        console.error('❌ Error al crear resultado médico:', err);
        alert('Error al crear resultado médico');
      },
    });
  }
}
