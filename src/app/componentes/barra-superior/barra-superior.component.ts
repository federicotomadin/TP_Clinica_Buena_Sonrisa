import { Component, OnInit } from '@angular/core';
import { PrincipalService } from '../../servicios/principal.service';
import { Usuario } from '../../clases/usuario';
import {AuthService  } from '../../servicios/auth.service';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {
  public usuario: Usuario;
  public taLogueado = false;

  constructor(private auth: AuthService) {
    this.usuario = this.auth.usuarioLogueado;
    if (this.auth.usuarioLogueado) {
      this.taLogueado = true;
    }
  }

  ngOnInit() {
  }

}
