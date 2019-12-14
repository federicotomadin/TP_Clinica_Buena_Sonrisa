import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, pipe } from 'rxjs';
import { map, concat } from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AngularFireAuth } from '@angular/fire/auth';
import { Turno } from '../clases/turno';
import { Clinica } from '../clases/clinica';



@Injectable({
  providedIn: 'root'
})
export class ConcesioService {

  private dbPathClinica = '/Clinica';
  clinicaCollection: AngularFirestoreCollection;
  clinica: Observable<Clinica[]>;
  clinicaDoc: AngularFirestoreDocument<Clinica>;

  public idTurnoActual
  public razonSocial: string;
  public clinic;

  RefClinica: AngularFireList<Clinica> = null;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private miBase: AngularFirestore) {
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
  }

  getClinica() {
    return this.clinica;
  }


  addVehiculo(clinica: Clinica): boolean {
    if (this.clinicaCollection.add({...clinica})) {
      return true;
    } else {
      return false;
    }
  }

  deleteConcesio(clinica: Clinica) {
    this.clinic = this.miBase.doc(`clinica/${clinica.key}`);
    this.clinic.delete();
        }

  createConcesio(clinica: Clinica): void {
    this.RefClinica.push({...clinica});
  }













}
