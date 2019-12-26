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
import { HorarioLogueo } from '../clases/horarioLogueo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public horarioLogueo: HorarioLogueo;
  public eventAuthError = new BehaviorSubject<boolean>(true);
  public eventAuthErrors = this.eventAuthError.asObservable();
  public isLogin = false;
  public usuarioLogueado: Usuario;
  especialidad: string;

  constructor(public afAuth: AngularFireAuth,
    public db: AngularFirestore,
    public dbBase: AngularFireDatabase,
    public router: Router,
    public principalService: PrincipalService) { }


  CrearUsuario(usuario: Usuario) {
    this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(resp => {
        this.principalService.createUsuario(usuario);
      });
  }

  CrearPaciente(usuario: Usuario) {
    usuario.especialidad = 'Paciente';
    usuario.matriculaMedico = '';
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

        //verifico que venga algo de auth
        if (usuarioCredential) {

          const suscription = this.principalService.getUsuario().subscribe(resp => {

            resp.filter(data => data.email === usuarioCredential.user.email).map(resultado => {

              this.CargarDatos(resultado);

              suscription.unsubscribe();

              switch (resultado.especialidad) {
                case 'Recepcionista':
                  this.router.navigate(['/Recepcionista']);
                  break;
                case 'Odontologo':
                  this.router.navigate(['/Medico']);
                  break;
                case 'Paciente':
                  this.router.navigate(['/Cliente']);
                  break;
                case 'Laboratorista':
                  this.router.navigate(['/Laboratorista']);
                  break;
                case 'Administrador':
                  this.router.navigate(['/Administrador']);
                  break;
                default:
                  this.router.navigate(['/Login']);
                  break;
              }
            });

          })
        }
        this.router.navigate(['/Login']);
      })
  }

  CargarDatos(data: any) {

    
    localStorage.usuarioLogueado = JSON.stringify(data);
    this.usuarioLogueado = data;
    this.especialidad = data.especialidad;
    this.horarioLogueo = new HorarioLogueo();
    this.horarioLogueo.horarioEntrada = new Date().toDateString();
    this.horarioLogueo.email = this.usuarioLogueado.email;

    this.horarioLogueo.dniUsuario = this.usuarioLogueado.dniUsuario;
    this.horarioLogueo.matriculaMedico = this.usuarioLogueado.matriculaMedico;
    this.principalService.crearFechaLogueo(this.horarioLogueo);
  }

  Logout() {
    return this.afAuth.auth.signOut();
  }
}
