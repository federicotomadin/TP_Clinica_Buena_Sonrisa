import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';

import { Clinica } from '../clases/clinica';
import { Usuario } from '../clases/usuario';
import { Turno } from '../clases/turno';
import { HistoriaClinica } from '../clases/historiaClinica';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { element } from 'protractor';
import { formatDate } from '@angular/common';
import { HorarioLogueo } from '../clases/horarioLogueo';



@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  private dbPathClinica = '/Clinica';
  clinicaCollection: AngularFirestoreCollection<Clinica>;
  clinica: Observable<Clinica[]>;
  clinicaDoc: AngularFirestoreDocument<Clinica>;

  HistoriaClinicaCollection: AngularFirestoreCollection<HistoriaClinica>;
  historiaClinica: Observable<HistoriaClinica[]>;
  historiaClinicaDoc: AngularFirestoreDocument<HistoriaClinica>;

  usuarioCollection: AngularFirestoreCollection<Usuario>;
  usuario: Observable<Usuario[]>;
  usuarioDoc: AngularFirestoreDocument<Usuario>;

  horarioLogueoCollection: AngularFirestoreCollection<HorarioLogueo>;
  horarioLogueo: Observable<HorarioLogueo[]>;

  turnos: Observable<Turno[]>;

  public idTurnoActual: any;
  public razonSocial: string;
  public clinic;

  public error: string;

  usuariosMedicosCollection: AngularFirestoreCollection<Usuario>;
  usuariosMedicos: Observable<Usuario[]>;

  public medicos: any;
  public usuarios: any;
  public listaMedicos=[];
  public listaTurnos=[]
  
  public listaUsuarios=[];
  public listaPacientes=[];

  RefClinica: AngularFireList<Clinica> = null;
  RefUsuario: AngularFireList<Usuario> = null;



  ////
  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase,
              private miBase: AngularFirestore) {
    this.RefClinica = db.list(this.dbPathClinica);


    this.clinicaCollection = this.miBase.collection('clinica');
    this.clinica = this.clinicaCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Clinica;
        this.razonSocial = data.razonSocial;
        data.key = a.payload.doc.id;
        this.idTurnoActual = a.payload.doc.id;
        return data;
      });
    }));

    this.usuarioCollection = this.miBase.collection('usuario');
    this.usuario = this.usuarioCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        data.key = a.payload.doc.id;
        this.idTurnoActual = a.payload.doc.id;
        return data;
      });
    }));

    this.HistoriaClinicaCollection = this.miBase.collection('historiaClinica');
    this.historiaClinica = this.HistoriaClinicaCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as HistoriaClinica;
        data.key = a.payload.doc.id;
        this.idTurnoActual = a.payload.doc.id;
        return data;
      });
    }));

    this.horarioLogueoCollection = this.miBase.collection('horarioLogueo');
    this.horarioLogueo = this.horarioLogueoCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as HorarioLogueo;
        return data;
      });
    }));

    this.turnos = this.miBase.collection('turno').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Turno;
        data.key= a.payload.doc.id;
        return data;
      });
    }));

    this.turnos.subscribe(resp => {
      this.listaTurnos=[]
    
      resp.map( dat => {
         if(dat.cancelado==false) this.listaTurnos.push(dat)
         })      
    });

    
    ///usuarios:

    this.usuariosMedicosCollection = this.miBase.collection('usuario');
    this.usuariosMedicos = this.usuariosMedicosCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        data.key=a.payload.doc.id;
        return data;
      });
    }));

    
  this.usuariosMedicos.subscribe(resp => {
    this.listaUsuarios=[]
    resp.map( dat => {
      this.listaUsuarios.push(dat);
      if (!dat.matriculaMedico!=undefined) {
       
        if ( dat.especialidad.toLowerCase() == 'paciente') {
          this.listaPacientes.push(dat);
        }
        if (dat.matriculaMedico.length > 2  && dat.especialidad.toLowerCase() != 'recepcionista' && dat.especialidad.toLowerCase() != 'administrador' && dat.especialidad.toLowerCase() != 'paciente') {
        this.listaMedicos.push(dat);
      }
    }
    });
  });

  }

  getClinica() {
    return this.clinica;
  }


  // ========================Usuarios

  getUsuario() {
    return this.usuario;
  }

  getMedicos() {
    return this.medicos;
  }

  getUsuariosMedicos() {
    return this.usuariosMedicos;
  }


  // ========================Turnos

traerUsuarios() {
  this.usuarios = this.miBase.collection('usuario').snapshotChanges().pipe(map(actions => 
    actions.map(a => a.payload.doc.data())));

}

  traerTodosLosMedicos() {

    this.medicos = this.miBase.collection('usuario').snapshotChanges().pipe(map(actions => 
      actions.map(a => a.payload.doc.data())));
  }

  traerTurnos() {

    this.turnos = this.miBase.collection('turno').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Turno;
        return data;
      });
    }));
  }


  // addVehiculo(clinica: Clinica): boolean {
  //   if (this.clinicaCollection.add({ ...clinica })) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // ========================Historia Clinica

  cargarHistoriaClinica(historia: HistoriaClinica, dniPaciente: string) {
    historia.dniPaciente = dniPaciente;
    historia.matriculaEspecialista = '1234';
    historia.especialista = (JSON.parse(localStorage.usuarioLogueado)).nombre;
    historia.fecha = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.miBase.collection('historiaClinica').add({ ...historia });
  }
  cargarTurno(t: Turno) {
   
    this.miBase.collection('turno').add({ ...t });
  }


traerHistoriasClinicas() {

    this.historiaClinica = this.miBase.collection('historiaClinica').snapshotChanges().pipe(map(actions => {
      // console.log(actions);
      return actions.map(a => {
        // console.log(a)
        const data = a.payload.doc.data() as HistoriaClinica;
        return data;
      });
    }));
  }

  async freno(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  deleteConcesio(clinica: Clinica) {
    this.clinic = this.miBase.doc(`clinica/${clinica.key}`);
    this.clinic.delete();
  }

  createUsuario(usuario: Usuario): void {
    this.usuarioCollection.add({ ...usuario });
  }

  crearFechaLogueo(horarioLogueo: HorarioLogueo): void {
    this.horarioLogueoCollection.add({...horarioLogueo});
  }

  getFechasLogueo() {
    return this.horarioLogueo;
  }

  getTurnos() {
    return this.turnos;
  }

  getHistoraClinica() {
    return this.historiaClinica;
  }

  actualizarTurnoEnFirebase(t:Turno){
    //let setDoc = db.collection('cities').doc('LA').set(data);
    
    this.miBase.collection('turno').doc(t.key).set(t);
  }

  dni2usuario(dni:any){
    return this.listaUsuarios.filter(u=>u.dniUsuario==dni)
  }
















}
