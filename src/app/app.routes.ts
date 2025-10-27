import { Routes } from '@angular/router';

// Usuarios
import { UsuarioListComponent } from './features/usuarios/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './features/usuarios/usuario-form/usuario-form.component';

// Pacientes
import { PacienteListComponent } from './features/pacientes/paciente-list/paciente-list.component';
import { PacienteFormComponent } from './features/pacientes/paciente-form/paciente-form.component';

// Médicos
import { MedicoListComponent } from './features/medicos/medico-list/medico-list.component';
import { MedicoFormComponent } from './features/medicos/medico-form/medico-form.component';

// Citas
import { CitaListComponent } from './features/citas/cita-list/cita-list.component';
import { CitaFormComponent } from './features/citas/cita-form/cita-form.component';

// Resultados Médicos
import { ResultadoListComponent } from './features/resultados/resultado-list/resultado-list.component';
import { ResultadoFormComponent } from './features/resultados/resultado-form/resultado-form.component';

export const routes: Routes = [
  // Default
  { path: '', redirectTo: 'pacientes', pathMatch: 'full' },

  // Usuarios
  { path: 'usuarios', component: UsuarioListComponent },
  { path: 'usuarios/nuevo', component: UsuarioFormComponent },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent },

  // Pacientes
  { path: 'pacientes', component: PacienteListComponent },
  { path: 'pacientes/nuevo', component: PacienteFormComponent },
  { path: 'pacientes/editar/:id', component: PacienteFormComponent },

  // Médicos
  { path: 'medicos', component: MedicoListComponent },
  { path: 'medicos/nuevo', component: MedicoFormComponent },
  { path: 'medicos/editar/:id', component: MedicoFormComponent },

  // Citas
  { path: 'citas', component: CitaListComponent },
  { path: 'citas/nueva', component: CitaFormComponent },

  // Resultados Médicos
  { path: 'resultados', component: ResultadoListComponent },
  { path: 'resultados/nuevo', component: ResultadoFormComponent },

  // Fallback
  { path: '**', redirectTo: 'pacientes' }
];
