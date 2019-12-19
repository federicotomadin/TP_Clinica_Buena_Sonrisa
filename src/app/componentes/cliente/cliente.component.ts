import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { Turno } from '../../clases/turno';
import { PrincipalService } from '../../servicios/principal.service';

import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClienteComponent implements OnInit {
  public nombre: string;
  public usuario: Usuario;

  public mostrarCalendario: Boolean = true;
  public mostrarBuscadorPacientes: Boolean = false;

  constructor(ser: PrincipalService, auth: AuthService, router: Router) {
    if (auth.usuarioLogueado == undefined) {
      router.navigate(['Login']);
      localStorage.usuarioLogueado = undefined;
     } else    this.usuario = auth.usuarioLogueado;
    

  }


  verBuscador() {
    console.log("ver buscador - func recepcionista")
    this.mostrarBuscadorPacientes = true;
    this.mostrarCalendario = false;
  }

  verCalendario() {
    console.log("ver calendario - func recepcionista")
    this.mostrarBuscadorPacientes = false;
    this.mostrarCalendario = true;
  }

  ngOnInit() {
  }

}
