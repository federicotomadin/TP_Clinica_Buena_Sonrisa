import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CalendarioComponent} from '../app/componentes/calendario/calendario.component';
import {ClientesComponent} from '../app/componentes/clientes/clientes.component';
import {HistoriaclinicaComponent} from '../app/componentes/historiaclinica/historiaclinica.component';
import {LoginComponent} from '../app/componentes/login/login.component';
import {MedicoComponent} from '../app/componentes/medico/medico.component';
import {PedirturnoComponent} from '../app/componentes/pedirturno/pedirturno.component';
import {PonerHistoriaClinicaComponent} from '../app/componentes/poner-historia-clinica/poner-historia-clinica.component';
import {RegistroComponent} from '../app/componentes/registro/registro.component';



const routes = [
  { path: '', component: LoginComponent},
  { path: 'calendario', component: CalendarioComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'historia', component: HistoriaclinicaComponent},
  { path: 'login', component: LoginComponent},
  { path: 'medico', component: MedicoComponent},
  { path: 'turno', component: PedirturnoComponent},
  { path: 'poner-historia', component: PonerHistoriaClinicaComponent},
  { path: 'registro', component: RegistroComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
