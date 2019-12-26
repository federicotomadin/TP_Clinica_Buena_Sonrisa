import { Component, OnInit , Output, EventEmitter, Input} from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

import { Usuario } from '../../clases/usuario';
import { Turno } from '../../clases/turno';
import { PrincipalService } from '../../servicios/principal.service';
import { isNullOrUndefined } from 'util';



@Component({
  selector: 'app-pedirturno',
  templateUrl: './pedirturno.component.html',
  styleUrls: ['./pedirturno.component.css']
})
export class PedirturnoComponent implements OnInit {
  @Output() sacar : EventEmitter <Boolean> = new EventEmitter<Boolean>();
  @Input() fecha: Date;


  public matriculaMedico: any;
  public dniUsuario: any;
  listaMedicosLocal = [];

  constructor(public ser: PrincipalService) { }

  ngOnInit() {
   
    this.ser.getUsuariosMedicos().subscribe(resp => {
      resp.map( dat => {
        if (!isNullOrUndefined(dat.matriculaMedico)) {
        if (dat.matriculaMedico.length > 2 && dat.especialidad != 'Administrador' && dat.especialidad != 'Paciente') {
          console.log(dat.matriculaMedico);
          this.listaMedicosLocal.push(dat);
        }
        }
      });
    });
  }

  pedirTurno(f: Date) {
    let n = new Turno();
    n.dniPaciente = this.dniUsuario;
    n.especialidad =  this.ser.matricula2Especialidad(this.matriculaMedico);
    n.matriculaMedico = this.matriculaMedico;
  
    n.fecha = this.fecha;

    console.log(n);
    this.ser.cargarTurno(n);
    this.sacar.emit(true);
  }

  quitarPedirTurno(e:Event){
    
   // e.stopPropagation();
    //e.preventDefault();

    this.listaMedicosLocal = null;

    if (e["toElement"].className == 'cont'){
        this.sacar.emit(true);
      }
  }

}
