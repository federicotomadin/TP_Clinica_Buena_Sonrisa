import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private storage: AngularFireStorage) { }

   // Tarea para subir archivo
   public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);

  }

  // Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string): any {
    return this.storage.ref(nombreArchivo);
  }
}
