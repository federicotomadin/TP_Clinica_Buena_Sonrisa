import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { Turno } from '../../clases/turno';


import { PrincipalService } from '../../servicios/principal.service';
import {AuthService  } from '../../servicios/auth.service';
import { analytics } from 'firebase';

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
public info_paciente:Usuario;
public nombrePaciente: string;
@Input() turno: Turno;
@Output() sacar: EventEmitter <Boolean> = new EventEmitter<Boolean>();

turnoAnterior: any;
comemtario: string;

constructor(public auth: AuthService, private ser: PrincipalService) {
  
  }

  ngOnInit() {

    this.turnoAnterior = localStorage.getItem('elTurnoEsAnterior');



    this.nombrePaciente = this.turno.nombre;
    this.dniPaciente=this.turno.dniPaciente;
    this.matriculaMedico=this.turno.matriculaMedico;
    this.fecha=this.turno.fecha["toDate"]();

    this.fecha= this.fecha.toLocaleDateString()+" "+ this.fecha.toLocaleTimeString();
    
    this.info_paciente=this.ser.dni2usuario(this.dniPaciente)[0]

  }


  CargarResenia() {
    this.ser.actualizarTurnoEnFirebase(this.turno);
    this.sacar.emit(true);
  }


  quitarVerTurno(e:Event){
    
    // e.stopPropagation();
     //e.preventDefault();
     if(e["toElement"].className=="cont"){
         this.sacar.emit(true);
       }
   }

   borrarTurno() {
     
      
      this.turno.cancelado=true;
      this.ser.actualizarTurnoEnFirebase(this.turno);
      this.sacar.emit(true);
   }

}
