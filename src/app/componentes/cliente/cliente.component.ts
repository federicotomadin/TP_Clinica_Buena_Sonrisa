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


  constructor() {
    this.usuario = JSON.parse(localStorage.usuarioLogueado);
    this.nombre = this.usuario.nombre;

  }




  ngOnInit() {
  }

}
