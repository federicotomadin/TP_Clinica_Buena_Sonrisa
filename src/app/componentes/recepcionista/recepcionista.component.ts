import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { PrincipalService } from '../../servicios/principal.service';
import {AuthService  } from '../../servicios/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recepcionista',
  templateUrl: './recepcionista.component.html',
  styleUrls: ['./recepcionista.component.css']
})
export class RecepcionistaComponent implements OnInit {
  usuario: Usuario;
  public mostrarCalendario:Boolean=true;
  public mostrarBuscadorPacientes:Boolean=false;

  constructor(private auth: AuthService, private ser: PrincipalService,   private router: Router) {
    if (auth.usuarioLogueado == undefined) {
      router.navigate(['Login']);
      localStorage.usuarioLogueado = undefined;
     } else    this.usuario = auth.usuarioLogueado;
  }
  
  verBuscador(){
    console.log('ver buscador - func recepcionista')
  this.mostrarBuscadorPacientes = true;
  this.mostrarCalendario = false;
   }

   verCalendario(){
     console.log("ver calendario - func recepcionista")
    this.mostrarBuscadorPacientes=false;
    this.mostrarCalendario=true;
     }

  ngOnInit() {


  }

}
