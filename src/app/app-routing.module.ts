import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CalendarioComponent} from '../app/componentes/calendario/calendario.component';
import {ClienteComponent} from './componentes/cliente/cliente.component';
import {HistoriaclinicaComponent} from '../app/componentes/historiaclinica/historiaclinica.component';
import {LoginComponent} from '../app/componentes/login/login.component';
import {MedicoComponent} from '../app/componentes/medico/medico.component';
import {PedirturnoComponent} from '../app/componentes/pedirturno/pedirturno.component';
import {PonerHistoriaClinicaComponent} from '../app/componentes/poner-historia-clinica/poner-historia-clinica.component';
import {RegistroComponent} from '../app/componentes/registro/registro.component';
import { RecepcionistaComponent } from './componentes/recepcionista/recepcionista.component';
import { LaboratoristaComponent } from './componentes/laboratorista/laboratorista.component';



const routes = [
  { path: '', component: LoginComponent},
  { path: 'Calendario', component: CalendarioComponent },
  { path: 'Cliente', component: ClienteComponent },
  { path: 'Historia', component: HistoriaclinicaComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'Medico', component: MedicoComponent},
  { path: 'Turno', component: PedirturnoComponent},
  { path: 'Recepcionista', component: RecepcionistaComponent},
  { path: 'Laboratorista', component: LaboratoristaComponent},
  { path: 'Poner-historia', component: PonerHistoriaClinicaComponent},
  { path: 'Registro', component: RegistroComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
