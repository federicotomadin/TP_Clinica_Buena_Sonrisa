import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
// import { FirebaseStorageService } from './servicios/firebase-storage.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { PedirturnoComponent } from './componentes/pedirturno/pedirturno.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { PonerPuntajeComponent } from './componentes/poner-puntaje/poner-puntaje.component';
import { PonerHistoriaClinicaComponent } from './componentes/poner-historia-clinica/poner-historia-clinica.component';
import { MedicoComponent } from './componentes/medico/medico.component';
import { RecepcionistaComponent } from './componentes/recepcionista/recepcionista.component';

import { environment } from '../environments/environment';
import { FiltroPipe } from './pipes/filtro.pipe';


import { AuthService } from './servicios/auth.service';
import { PrincipalService } from './servicios/principal.service';
import { LaboratoristaComponent } from './componentes/laboratorista/laboratorista.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { FirestorageService } from './servicios/firestorage.service';
import { BarraSuperiorComponent } from './componentes/barra-superior/barra-superior.component';
import { BuscarPacienteComponent } from './componentes/buscar-paciente/buscar-paciente.component';
import { VerTurnoComponent } from './componentes/ver-turno/ver-turno.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    PedirturnoComponent,
    RegistroComponent,
    LoginComponent,
    CalendarioComponent,
    PonerPuntajeComponent,
    PonerHistoriaClinicaComponent,
    MedicoComponent,
    RecepcionistaComponent,
    FiltroPipe,
    LaboratoristaComponent,
    AdministradorComponent,
    BarraSuperiorComponent,
    BuscarPacienteComponent,
    VerTurnoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],

  providers: [PrincipalService, AuthService, FirestorageService],

  bootstrap: [AppComponent]
})
export class AppModule { }
