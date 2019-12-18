import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/servicios/auth.service';

import { Usuario } from '../../clases/usuario';
import { PrincipalService } from '../../servicios/principal.service';
import { HorarioLogueo } from 'src/app/clases/horarioLogueo';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recordarme = false;
  usuario: Usuario;
  authError: any;
  logueado: string;
  mostrarImagen = false;
  urlFoto: string;
  horarioLogueo: HorarioLogueo;

  constructor(private principalService: PrincipalService,
              public ruta: Router, private authService: AuthService) {
                this.TraerImagenLogin();
                this.horarioLogueo = new HorarioLogueo();

              }

  ngOnInit() {
    this.usuario = new Usuario();

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  TraerImagenLogin() {
  if (localStorage.getItem('urlFoto')) {
    this.mostrarImagen = true;
    this.urlFoto = localStorage.getItem('urlFoto');
  } else {
    this.urlFoto = '../../../assets/imagenes/login.png';
  }
}

  Login(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text: 'Ingresando...',
    timer: 4000
    });

    this.authService.Login(form.value);
    localStorage.setItem('email', this.usuario.email);
    const usu: Usuario = form.value;
    console.log(new Date().toDateString());
    this.horarioLogueo.horarioEntrada = (new Date()).toDateString();
    if (!isNullOrUndefined(this.authService.usuarioLogueado)) {
      this.horarioLogueo.email = this.authService.usuarioLogueado.email;
    } else {
      this.horarioLogueo.email = '';
    }
    this.horarioLogueo.dniUsuario = usu.dniUsuario;
    this.horarioLogueo.matriculaMedico = usu.matriculaMedico;
    this.principalService.crearFechaLogueo(this.horarioLogueo);
    Swal.showLoading();
    if (this.recordarme) {
  }
    Swal.close();
}

ngSubmit(form: NgForm) {

this.Login(form);

}
}

