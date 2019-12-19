import { Component, OnInit, Input, Output } from '@angular/core';
import { PrincipalService } from '../../servicios/principal.service';
import { Turno } from '../../clases/turno';

@Component({
  selector: 'app-poner-puntaje',
  templateUrl: './poner-puntaje.component.html',
  styleUrls: ['./poner-puntaje.component.css']
})
export class PonerPuntajeComponent implements OnInit {

  @Input() turno: Turno;
  // @Output() sacar: EventEmitter <Boolean> = new EventEmitter<Boolean>();

  public reseña: string;


  constructor(private ser: PrincipalService) {
  

    this.reseña = this.turno.comentario;
    

   }

  ngOnInit() {



  }



}
