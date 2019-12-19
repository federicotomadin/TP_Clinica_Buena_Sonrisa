import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { Turno } from '../../clases/turno';


import { PrincipalService } from '../../servicios/principal.service';
import {AuthService  } from '../../servicios/auth.service';

@Component({
  selector: 'app-ver-turno',
  templateUrl: './ver-turno.component.html',
  styleUrls: ['./ver-turno.component.css']
})
export class VerTurnoComponent implements OnInit {
public nombreMedico: string;
public dniPaciente: string;
public matriculaMedico: string;
public fecha: any;
public nombrePaciente: string;
@Input() turno: Turno;
@Output() sacar: EventEmitter <Boolean> = new EventEmitter<Boolean>();


constructor(private auth: AuthService, private ser: PrincipalService) {



  }

  ngOnInit() {

    this.nombrePaciente = this.turno.nombre;
    this.dniPaciente=this.turno.dniPaciente;
    this.matriculaMedico=this.turno.matriculaMedico;
    this.fecha=this.turno.fecha["toDate"]();

    this.fecha= this.fecha.toLocaleDateString()+" "+ this.fecha.toLocaleTimeString();
    


  }
  quitarVerTurno(e:Event){
    
    // e.stopPropagation();
     //e.preventDefault();
     if(e["toElement"].className=="cont"){
         this.sacar.emit(true);
       }
   }

}
