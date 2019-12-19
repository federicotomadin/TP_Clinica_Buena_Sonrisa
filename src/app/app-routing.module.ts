import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CalendarioComponent} from '../app/componentes/calendario/calendario.component';
import {ClienteComponent} from './componentes/cliente/cliente.component';
//import {HistoriaclinicaComponent} from '../app/componentes/historiaclinica/historiaclinica.component';
import {LoginComponent} from '../app/componentes/login/login.component';
import {MedicoComponent} from '../app/componentes/medico/medico.component';
import {PedirturnoComponent} from '../app/componentes/pedirturno/pedirturno.component';
import {PonerHistoriaClinicaComponent} from '../app/componentes/poner-historia-clinica/poner-historia-clinica.component';
import {RegistroComponent} from '../app/componentes/registro/registro.component';
import { RecepcionistaComponent } from './componentes/recepcionista/recepcionista.component';
import { LaboratoristaComponent } from './componentes/laboratorista/laboratorista.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';

import { AuthGuard } from './guards/auth.guard';
import { RecepcionistaGuardGuard } from './guards/recepcionista-guard.guard';
import { MedicoGuardGuard } from './guards/medico-guard.guard';




const routes = [
  { path: '', component: LoginComponent},
  { path: 'Calendario', component: CalendarioComponent, canActivate: [AuthGuard] },
  { path: 'Cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  //{ path: 'Historia', component: HistoriaclinicaComponent, canActivate: [AuthGuard]},
  { path: 'Login', component: LoginComponent},
  { path: 'Medico', component: MedicoComponent, canActivate: [MedicoGuardGuard]},
  { path: 'Turno', component: PedirturnoComponent, canActivate: [AuthGuard]},
  { path: 'Recepcionista', component: RecepcionistaComponent, canActivate: [RecepcionistaGuardGuard]},
  { path: 'Laboratorista', component: LaboratoristaComponent, canActivate: [AuthGuard]},
  { path: 'ponerhistoria', component: PonerHistoriaClinicaComponent, canActivate: [AuthGuard, MedicoGuardGuard, RecepcionistaGuardGuard]},
  { path: 'Registro', component: RegistroComponent},
  { path: 'Administrador', component: AdministradorComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
