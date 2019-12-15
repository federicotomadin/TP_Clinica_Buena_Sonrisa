import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { Turno } from '../../clases/turno';
import { PrincipalService } from '../../servicios/principal.service';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @Input() usuario: string;
  dias = [];
  arrayTurnos = [];

  constructor(private ser: PrincipalService) {


    // this.dias.push({fecha:today.getDate()+"/"+String(Number(today.getMonth()+1))+"/"+today.getUTCFullYear(), turnos:[]})



    this.setearArray()



  }


  setearArray(){
    
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      let unDiaMas = new Date(today)
      unDiaMas.setDate(unDiaMas.getDate() + i);
      this.dias[i] = { dia: unDiaMas.getDate(), "mes": unDiaMas.getMonth() + 1, "ano": unDiaMas.getUTCFullYear(), turnos: [] };
      //de 8 a 18, 10hs*4 turnos disponibles:

      let hora = new Date(unDiaMas);
      hora.setHours(8); //arranca a las 8
      hora.setMinutes(0);
      hora.setSeconds(0);
      for (let j = 0; j < 50; j++) {
      
        this.dias[i].turnos.push({ "hora": hora.getHours(), "minutos": hora.getMinutes() })
        hora.setMinutes(hora.getMinutes() + 15)
      }

    }
  }
  clickTurno(e:Event, turno:any, dia:any){
   if(turno.hasOwnProperty("turno")){
     console.log(turno.turno)
    //HAY TURNO EN ESTE HORARIO
    }else{
      //NO HAY TURNO EN ESTE HORARIO
      alert("agregar turno a este horario")


    }
  }
  traerTurnosQVeElUsuario() {
    this.setearArray() //VACIO TODO
    this.ser.traerTurnos()
    this.ser.turnos.subscribe((e) => {
      this.arrayTurnos = e;
      
      for(let i=0;i<e.length;i++){
        this.agregarTurno(e[i]);
        }
    });
  }

  agregarTurno(t: any) {
    window["calendario"]=this;
    let fechaTurno = t.fecha.toDate();
    
    console.log(fechaTurno, this.dias[0].ano);
    if (fechaTurno.getFullYear() < this.dias[0].ano) {
      console.log("el turno es de un año anterior al actual")
      return
    } else {
      if (fechaTurno.getMonth() + 1 < this.dias[0].mes) {
        console.log("el turno es de un mes anterior..");
        return
      } else {
        if (fechaTurno.getDate() < this.dias[0].dia) {
          console.log("el turno tiene dia menor");
          return
        } else {
          if (fechaTurno.getHours() < 9) {
            console.log("el turno es para antes de las 9 de la mañana..cualca");
            return
          } else {
            //esta todo bien y se carga
            for (let i = 0; i < this.dias.length; i++) {
              if (fechaTurno.getMonth() + 1 == this.dias[i].mes && fechaTurno.getDate() == this.dias[i].dia) {
                //es de este dia               
                for (let j = 0; j < this.dias[i].turnos.length; j++) {
                  let tur = this.dias[i].turnos[j];

                  if (tur.hora == fechaTurno.getHours()) {
                    if (Math.abs(tur.minutos - fechaTurno.getMinutes())<10) {
                      this.dias[i].turnos[j]["turno"] = t;
                      return 1;
                    }
                  }
                }//for j
              }
            }//for
          }
        }
      }
    }
  }

  ngOnInit() {
    this.traerTurnosQVeElUsuario();/*
    let t = new Turno(new Date("1981-04-05 20:20"));
    let t2 = new Turno(new Date("2019-12-15 15:20"));
    let t3 = new Turno(new Date("2020-01-01 11:20"));
    let t4 = new Turno(new Date("2019-12-20 17:20"));
    this.agregarTurno(t);
    this.agregarTurno(t2);
    this.agregarTurno(t3);
    this.agregarTurno(t4);

    console.log(this.dias)*/



  }



}
