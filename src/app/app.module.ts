import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { PedirturnoComponent } from './componentes/pedirturno/pedirturno.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { HistoriaclinicaComponent } from './componentes/historiaclinica/historiaclinica.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { PonerPuntajeComponent } from './componentes/poner-puntaje/poner-puntaje.component';
import { PonerHistoriaClinicaComponent } from './componentes/poner-historia-clinica/poner-historia-clinica.component';
import { MedicoComponent } from './componentes/medico/medico.component';
import { RecepcionistaComponent } from './componentes/recepcionista/recepcionista.component';

import * as firebase from 'firebase/app';
import { environment } from '../environments/environment'; 
import { GeneralService } from './servicios/general.service';
import { FiltroPipe } from './pipes/filtro.pipe';

import {RouterModule, Routes} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    PedirturnoComponent,
    RegistroComponent,
    LoginComponent,
    HistoriaclinicaComponent,
    CalendarioComponent,
    PonerPuntajeComponent,
    PonerHistoriaClinicaComponent,
    MedicoComponent,
    RecepcionistaComponent,
    FiltroPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    // firebase.initializeApp(environment.firebase)
  ],
  providers: [GeneralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
