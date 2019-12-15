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
import { HistoriaclinicaComponent } from './componentes/historiaclinica/historiaclinica.component';
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


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    PedirturnoComponent,
    RegistroComponent,
    LoginComponent,
    HistoriaclinicaComponent,
    CalendarioComponent,
    PonerPuntajeComponent,
    PonerHistoriaClinicaComponent,
    MedicoComponent,
    RecepcionistaComponent,
    FiltroPipe,
    LaboratoristaComponent
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
    // firebase.initializeApp(environment.firebase)
  ],
  providers: [ PrincipalService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
