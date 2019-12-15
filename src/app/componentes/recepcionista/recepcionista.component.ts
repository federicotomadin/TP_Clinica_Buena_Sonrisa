import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { PrincipalService } from '../../servicios/principal.service';



@Component({
  selector: 'app-recepcionista',
  templateUrl: './recepcionista.component.html',
  styleUrls: ['./recepcionista.component.css']
})
export class RecepcionistaComponent implements OnInit {
  usuario: Usuario;



  constructor(private ser:PrincipalService) {
   

   }


  ngOnInit() {
   this.usuario= JSON.parse(localStorage["usuarioLogueado"]);
    console.log(this.usuario);



  }

}
