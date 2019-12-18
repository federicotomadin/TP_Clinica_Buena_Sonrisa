import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/servicios/auth.service';

import { Usuario } from '../../clases/usuario';
import { HistoriaClinica } from '../../clases/historiaClinica';
import { PrincipalService } from '../../servicios/principal.service';



@Component({
  selector: 'app-poner-historia-clinica',
  templateUrl: './poner-historia-clinica.component.html',
  styleUrls: ['./poner-historia-clinica.component.css']
})
export class PonerHistoriaClinicaComponent implements OnInit {
  @Output() sacar: EventEmitter <Boolean> = new EventEmitter<Boolean>();

  checked = true;

  historias: HistoriaClinica[];

  historia: HistoriaClinica;
  tratamientos = [
    { name: 'Ortodoncia', abbrev: 'AZ' },
    { name: 'Radiografía', abbrev: 'CA' },
    { name: 'Perno y corona', abbrev: 'CO' },
  ];

  sacarPonerHistoria(e: Event){
    if (e["toElement"].id === 'cont') {
      this.sacar.emit(true);
    }
  }
  constructor(private principalService: PrincipalService,
              public ruta: Router, private authService: AuthService) { }

  ngOnInit() {
    // if (this.validarAcceso() === false) {
    //   this.ruta.navigate(['/Login']);
    // }

    this.traerHistorias();
    this.historia = new HistoriaClinica();
  }

  async freno(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }


  validarAcceso(): boolean {

     let usu: Usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

     return usu.especialidad === 'Recepcionista';
  }

  ngSubmit(form: NgForm) {
    this.CargarHistoria(form);
  }

  traerHistorias() {

    this.principalService.traerHistoriasClinicas();
    this.principalService.historiaClinica.subscribe((e) => {
      this.historias = e;
      console.log(this.historias);
    });

  }


  CargarHistoria(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando historia...',
      timer: 2000
    });

    this.principalService.cargarHistoriaClinica(form.value, '123456');
    Swal.showLoading();
  }
}
