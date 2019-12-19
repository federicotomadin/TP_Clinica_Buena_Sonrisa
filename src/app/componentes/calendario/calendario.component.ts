import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { Turno } from '../../clases/turno';
import { PrincipalService } from '../../servicios/principal.service';
import { PonerHistoriaClinicaComponent } from '../../componentes/poner-historia-clinica/poner-historia-clinica.component';
import { AuthService } from '../../servicios/auth.service';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @Input() usuario: string;
  @Input() rol: string;

  public usuarioLogueado: Usuario;
  public fechaClickeada: Date;
  public mostrarVerTurno = false;

  mostrarPonerHistoriaClinica = false;

  mostrarPedirTurno: Boolean = false;

  dias = [];
  arrayTurnos = [];
  todosLosTurnos = [];
  public turnoActivo: Turno;
  listaMedicos = [];

  constructor(private auth: AuthService, public ser: PrincipalService/*, private hc:PonerHistoriaClinicaComponent*/) {

    if (this.auth.usuarioLogueado == undefined || this.auth.usuarioLogueado == null) {
      this.usuarioLogueado = new Usuario();

    } else {
      this.usuarioLogueado = this.auth.usuarioLogueado;
    }


    // this.dias.push({fecha:today.getDate()+"/"+String(Number(today.getMonth()+1))+"/"+today.getUTCFullYear(), turnos:[]})



    this.setearArray();

    window["calendario"] = this;

  }
  sacarHistoriaClinica() {
    this.mostrarPonerHistoriaClinica = false;
    setTimeout(() => {
      this.traerTurnosQVeElUsuario();
      this.ponerTurnosVisualmente()
    }, 500);
  }

  sacarPedirTurno() {
    this.mostrarPedirTurno = false;

    setTimeout(() => {
      this.traerTurnosQVeElUsuario();
      this.ponerTurnosVisualmente()
    }, 500);

  }
  sacarVerTurno() {


    this.mostrarVerTurno = false;
    setTimeout(() => {
      this.traerTurnosQVeElUsuario();
      this.ponerTurnosVisualmente()
    }, 500)


  }

  cambioElSelect(val: any) {
    // let select=e.target;

    this.setearArray();
    this.arrayTurnos = [];
    for (let i = 0; i < this.todosLosTurnos.length; i++) {
      if (val != -1) {
        if (this.todosLosTurnos[i].matriculaMedico == val) {
          this.arrayTurnos.push(this.todosLosTurnos[i]);
        }
      } else {
        this.arrayTurnos = this.todosLosTurnos;
      }
    }


    this.ponerTurnosVisualmente();



  }

  setearArray() {

    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const unDiaMas = new Date(today);
      unDiaMas.setDate(unDiaMas.getDate() + i);
      this.dias[i] = { dia: unDiaMas.getDate(), mes: unDiaMas.getMonth() + 1, ano: unDiaMas.getUTCFullYear(), turnos: [] };
      // de 8 a 18, 10hs*4 turnos disponibles:

      const hora = new Date(unDiaMas);
      hora.setHours(8); // arranca a las 8
      hora.setMinutes(0);
      hora.setSeconds(0);
      for (let j = 0; j < 50; j++) {

        this.dias[i].turnos.push({ hora: hora.getHours(), minutos: hora.getMinutes() });
        hora.setMinutes(hora.getMinutes() + 15);
      }

    }
  }


  clickTurno(e: Event, turno: any, dia: any) {
    let a = new Date(dia.ano + "-" + dia.mes + "-" + dia.dia + " " + turno.hora + ":" + turno.minutos + ":00");
    //localStorage["dia"] = JSON.stringify(a);
    this.fechaClickeada = a;
    localStorage["elTurnoEsAnterior"]=null;

    console.log(this.fechaClickeada);

    if (turno.hasOwnProperty('turno')) {
      console.log(turno.turno)
      this.turnoActivo = turno.turno;
      this.mostrarVerTurno = true;
      console.log(this.turnoActivo);

      //// ACA EVALUAR SI LA FECHA ES ANTERIOR O PSTERIOR

      let fecha_ref = new Date();
      console.log(fecha_ref, this.fechaClickeada)
      if (this.fechaClickeada < fecha_ref) {
        localStorage["elTurnoEsAnterior"]=1
      } else {
        localStorage["elTurnoEsAnterior"]=0
      }


      /*  if (this.rol.toLowerCase() == "paciente" || this.rol.toLowerCase() == "recepcionista") {
          this.turnoActivo=turno.turno;
          this.mostrarVerTurno=true;
          console.log(this.turnoActivo);
        } else if (this.rol.toLowerCase() == "Odontologo") {
          this.turnoActivo=turno.turno;
          this.mostrarVerTurno=true;
          console.log(this.turnoActivo);
          //this.mostrarPonerHistoriaClinica = true;
  
        }*/
      //  console.log(turno.turno);
      // HAY TURNO EN ESTE HORARIO
      //  if(JSON.parse(localStorage["usuarioLogueado"]).especialidad=="Odontologo"){
      //   }
    } else {
      // NO HAY TURNO EN ESTE HORARIO
      if (this.rol.toLowerCase() != "odontologo") {
        this.mostrarPedirTurno = true;
      } else {
        console.log("el odontologo no pide turnos")
      }


    }
  }
  traerTurnosQVeElUsuario() {



    const usuario = this.auth.usuarioLogueado;
    this.setearArray(); // VACIO TODO
    this.ser.traerTurnos();



    if (this.rol === 'recepcionista') {
      this.todosLosTurnos = this.arrayTurnos = this.ser.listaTurnos
    } else if (this.rol === 'paciente') {

      this.arrayTurnos = this.ser.listaTurnos.filter(turno => turno.dniPaciente === usuario.dniUsuario);

    } else if (this.rol === 'odontologo') {
      this.arrayTurnos = this.ser.listaTurnos.filter(turno => turno.matriculaMedico === usuario.matriculaMedico);

    }
    this.ponerTurnosVisualmente();

  }
  ponerTurnosVisualmente() {

    for (let i = 0; i < this.arrayTurnos.length; i++) {
      this.agregarTurno(this.arrayTurnos[i]);
    }

  }
  agregarTurno(t: any) {

    const fechaTurno = t.fecha.toDate();

    for (let i = 0; i < this.dias.length; i++) {
      for (let j = 0; j < this.dias[i].turnos.length; j++) {
        let a = new Date(this.dias[i].ano + "-" + this.dias[i].mes + "-" + this.dias[i].dia + " " + this.dias[i].turnos[j].hora + ":" + this.dias[i].turnos[j].minutos + ":00")
        let dif = a.getTime() - fechaTurno.getTime();
        //console.log(dif);
        if (Math.abs(dif) < 9 * 1000 * 60) {
          this.dias[i].turnos[j].turno = t;
          return;
        }
      }
    }
    /*
        if (fechaTurno.getFullYear() < this.dias[0].ano) {
        //  console.log('el turno es de un año anterior al actual');
          return;
        } else {
          if (fechaTurno.getMonth() + 1 < this.dias[0].mes) {
          //  console.log('el turno es de un mes anterior..');
            return;
          } else {
            if (fechaTurno.getDate() < this.dias[0].dia) {
            //  console.log('el turno tiene dia menor');
              return;
            } else {
              if (fechaTurno.getHours() < 9) {
              //  console.log('el turno es para antes de las 9 de la mañana..cualca');
                return;
              } else {
              //  console.log(t)
                // esta todo bien y se carga
                for (let i = 0; i < this.dias.length; i++) {
                 // console.log(this.dias[i].ano, fechaTurno.getFullYear())
                 // console.log(fechaTurno.getMonth() + 1 ,this.dias[i].mes , fechaTurno.getDate() , this.dias[i].dia)
                  if (fechaTurno.getMonth() + 1 == this.dias[i].mes && fechaTurno.getDate() == this.dias[i].dia) {
                    // es de este dia
                    for (let j = 0; j < this.dias[i].turnos.length; j++) {
                      const tur = this.dias[i].turnos[j];
    
                      if (tur.hora == fechaTurno.getHours()) {
                        if (Math.abs(tur.minutos - fechaTurno.getMinutes()) < 10) {
                          this.dias[i].turnos[j].turno = t;
                          return 1;
                        }
                      }
                    }// for j
                  }
                }// for
              }
            }
          }
        }*/
  }

  ngOnInit() {

    this.ser.getUsuariosMedicos().subscribe(resp => {
      resp.map(dat => {
        if (dat.especialidad == 'Odontologo' || dat.especialidad == 'Laboratorista') {
          this.listaMedicos.push(dat);
        }
      });
    });



    this.traerTurnosQVeElUsuario(); /*
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
