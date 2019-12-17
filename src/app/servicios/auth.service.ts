import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PrincipalService } from './principal.service';
import { Usuario } from '../clases/usuario';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public eventAuthError = new BehaviorSubject<boolean>(true);
  public eventAuthErrors = this.eventAuthError.asObservable();

  public isLogin = false;
  public usuarioLogueado: Usuario;
  especialidad: string;


  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private dbBase: AngularFireDatabase,
              private router: Router,
              private principalService: PrincipalService) { }

  CrearUsuario(usuario: Usuario) {
    this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(resp => {
        this.principalService.createUsuario(usuario);
      });
  }

  CrearPaciente(usuario: Usuario) {
    usuario.especialidad = 'Paciente';
    this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(resp => {
        this.principalService.createUsuario(usuario);
      });
  }


  Login(usuario: Usuario) {

    this.afAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.password)
      .catch(error => {
        this.eventAuthError.next(error);
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          text: 'Credenciales Incorrectas',
          timer: 2000
        });
      })
      .then(usuarioCredential => {
        if (usuarioCredential) {


          this.principalService.getUsuario().subscribe(resp => {
            resp.map(data => {

              if (data.email === usuarioCredential.user.email) {
               // console.log("USUARIO LOGUEADO:", data);
              localStorage.usuarioLogueado = JSON.stringify(data);
              this.usuarioLogueado = data;
              // usuarioCredential.providerData[0]



              if (data.especialidad === 'Recepcionista') {
                this.especialidad = data.especialidad;

                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'info',
                    text: 'RECEPCIONISTA',
                    timer: 2000
                  });
                this.router.navigate(['/Recepcionista']);
                } else if (data.especialidad === 'Odontologo') {
                  this.especialidad = data.especialidad;
                  Swal.fire({
                    allowOutsideClick: false,
                    icon: 'info',
                    text: 'ODONTOLOGO',
                    timer: 2000
                  });
                  this.router.navigate(['/Medico']);
                } else if (data.especialidad === 'Paciente') {
                  this.especialidad = data.especialidad;
                  Swal.fire({
                    allowOutsideClick: false,
                    icon: 'info',
                    text: 'PACIENTE',
                    timer: 2000
                  });
                  this.router.navigate(['/Cliente']);
                } else if (data.especialidad === 'Laboratorista') {
                  this.especialidad = data.especialidad;
                  Swal.fire({
                    allowOutsideClick: false,
                    icon: 'info',
                    text: 'LABORATORISTA',
                    timer: 2000
                  });
                  this.router.navigate(['/Laboratorista']);
                }

              }

            });
          });

          this.router.navigate(['/Login']);


        }
      });
  }

  Logout() {
    return this.afAuth.auth.signOut();
  }



}
