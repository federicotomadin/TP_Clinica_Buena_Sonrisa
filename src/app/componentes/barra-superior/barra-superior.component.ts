import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PrincipalService } from '../../servicios/principal.service';
import { Usuario } from '../../clases/usuario';
import {AuthService  } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { HorarioLogueo } from '../../clases/horarioLogueo';
import { storage } from 'firebase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {
  public usuario: Usuario;
  public taLogueado = false;
  @Output() mostrarBuscador: EventEmitter <Boolean> = new EventEmitter<Boolean>();
  @Output() mostrarCalendario: EventEmitter <Boolean> = new EventEmitter<Boolean>();
  horarioLogueo: HorarioLogueo;



  constructor(private principalService: PrincipalService, private auth: AuthService,
              private router: Router, private afsAuth: AngularFireAuth) {
                
    this.usuario = this.auth.usuarioLogueado;
    this.horarioLogueo = new HorarioLogueo();
    if (this.auth.usuarioLogueado) {
      this.taLogueado = true;
    }

    window["barra_sup"] = this;
  }

  ngOnInit() {

    let usu: Usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if(usu == undefined || usu == null){
      
    Swal.fire({
      allowOutsideClick: false,
      icon: 'error',
      text: 'Por favor loguearse',
      timer: 4000
    });

      this.router.navigate(['/Login']);
    }
    else{
      this.usuario = usu;  
      this.taLogueado = true;    
    }
  }


  logout() {
    this.horarioLogueo.horarioSalida = Date();
    this.horarioLogueo.dniUsuario = this.auth.usuarioLogueado.dniUsuario;
    this.horarioLogueo.matriculaMedico = this.auth.usuarioLogueado.matriculaMedico;
    this.horarioLogueo.email = this.auth.usuarioLogueado.email;
    this.principalService.crearFechaLogueo(this.horarioLogueo);
    this.auth.Logout();
    this.afsAuth.auth.tenantId = null;
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/Login']);
  }

  verCalendario() {
    this.mostrarCalendario.emit(true);
    console.log('mostrar calendario');
    }
  mostrarBuscadorPorDni() {
    console.log('mostrar buscador por dni');
    this.mostrarBuscador.emit(true);
    }

}
