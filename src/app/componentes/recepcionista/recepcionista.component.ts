import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';



@Component({
  selector: 'app-recepcionista',
  templateUrl: './recepcionista.component.html',
  styleUrls: ['./recepcionista.component.css']
})
export class RecepcionistaComponent implements OnInit {
  usuario: Usuario;



  constructor() { }

  ngOnInit() {


    // this.usuario = new Usuario();
    // this.usuario.especialidad = Especialidad.Recepcionista;
    // this.usuario.nombre = 'nombre';
  }

}
