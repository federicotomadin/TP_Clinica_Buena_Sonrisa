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
  listaDniUsuario = [];

  constructor(public ser: PrincipalService, public auth:AuthService) {

    this.traerListaMedicos();

   }

  ngOnInit() {

    window["pedirturno"]=this;



    console.log(this.auth);

  }

traerListaMedicos(){


}

  pedirTurno() {
    let n = new Turno();

    this.ser.getUsuariosMedicos().subscribe(resp => {
      resp.map(dat => {
        if (dat.matriculaMedico == this.matriculaMedico) {
          n.especialidad = dat.especialidad;
        }
      });
    });

    n.dniPaciente = this.dniUsuario;
    n.matriculaMedico = this.matriculaMedico;
  
    n.fecha = this.fecha;

    console.log(n);
    this.ser.cargarTurno(n);
    this.sacar.emit(true);
  }

  quitarPedirTurno(e:Event){
    
   // e.stopPropagation();
    //e.preventDefault();
    if (e["toElement"].className == 'cont'){
        this.sacar.emit(true);
      }
  }

}
