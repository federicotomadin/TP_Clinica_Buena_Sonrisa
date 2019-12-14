import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { Turno } from '../../clases/turno';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @Input() usuario: Usuario;
  dias=[];

  constructor() { 
    const today = new Date()
  // this.dias.push({fecha:today.getDate()+"/"+String(Number(today.getMonth()+1))+"/"+today.getUTCFullYear(), turnos:[]})
  



    for (let i=0;i<30;i++){
      let unDiaMas=new Date(today)
      unDiaMas.setDate(unDiaMas.getDate() +i);
      this.dias[i]={dia:unDiaMas.getDate(), "mes":unDiaMas.getMonth(), "ano":unDiaMas.getUTCFullYear(), turnos:[]};
      //de 8 a 18, 10hs*4 turnos disponibles:
      
      let hora=new Date(unDiaMas);
      hora.setHours(8); //arranca a las 8
      hora.setMinutes(0);
      hora.setSeconds(0);
      for(let j=0;j<40;j++){       
        hora.setMinutes(hora.getMinutes() + 15)
        this.dias[i].turnos.push({"hora":hora.getHours(), "minutos":hora.getMinutes()})
      }

    }

    console.log(this.dias);

  }

  traerTurnosQVeElUsuario(){

  }

  agregarTurno(t:Turno){
    console.log(t)
    let a=new Date(t.fecha);
    if(a<this.dias[0].fecha){

    }
  }

  ngOnInit() {
    this.traerTurnosQVeElUsuario();
    let t=new Turno(new Date());
    this.agregarTurno(t);
  }

}
