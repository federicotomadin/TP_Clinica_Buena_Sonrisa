import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PrincipalService } from '../../servicios/principal.service';
import { Usuario } from '../../clases/usuario';
import {AuthService  } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {
  public usuario: Usuario;
  public taLogueado = false;
  @Output() mostrarBuscador : EventEmitter <Boolean> = new EventEmitter<Boolean>();
  @Output() mostrarCalendario : EventEmitter <Boolean> = new EventEmitter<Boolean>();

  

  constructor(private auth: AuthService, private router: Router) {
    this.usuario = this.auth.usuarioLogueado;
    if (this.auth.usuarioLogueado) {
      this.taLogueado = true;
    }

    window["barra_sup"]=this;
  }

  logout(){
    this.auth.afAuth.auth.signOut();
     
    this.router.navigate(['/Login']);
  }

  verCalendario(){
    this.mostrarCalendario.emit(true);
    console.log("mostrar calendario")
    }
  mostrarBuscadorPorDni(){
    console.log("mostrar buscador por dni")
    this.mostrarBuscador.emit(true);
    }

  ngOnInit() {
  }

}
