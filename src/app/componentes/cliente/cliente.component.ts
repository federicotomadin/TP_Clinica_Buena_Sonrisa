import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { Turno } from '../../clases/turno';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClienteComponent implements OnInit {
  public nombre: string;
  public usuario: Usuario;
  
  public mostrarCalendario:Boolean=true;
  public mostrarBuscadorPacientes:Boolean=false;

  constructor() {
    this.usuario = JSON.parse(localStorage.usuarioLogueado);
    this.nombre = this.usuario.nombre;

  }


  verBuscador(){
    console.log("ver buscador - func recepcionista")
  this.mostrarBuscadorPacientes=true;
  this.mostrarCalendario=false;
   }

   verCalendario(){
     console.log("ver calendario - func recepcionista")
    this.mostrarBuscadorPacientes=false;
    this.mostrarCalendario=true;
     }

  ngOnInit() {
  }

}
