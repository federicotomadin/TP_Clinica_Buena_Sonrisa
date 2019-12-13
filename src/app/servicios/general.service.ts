import { Injectable } from '@angular/core';

// import * as firebase from 'firebase';
import * as firebase from 'firebase';
// import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() {
    this.ser = firebase.initializeApp(environment.firebase);
   }

  public ser:any;
  public data:any;


  traerDatos_servicio() {

    // window["bla"]=this.ser;

    var messagesRef = this.ser.database().ref();

    messagesRef.once("value", (snap) => {

      this.data = snap.val();
      console.log(this.data["Direccion"]);

      for (var key in this.data) {

        console.log(this.data[key]);
      }

    });
  }
}
