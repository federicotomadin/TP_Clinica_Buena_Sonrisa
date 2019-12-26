import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

import { FirestorageService } from '../../servicios/firestorage.service';
import { Usuario } from 'src/app/clases/usuario';
import { PrincipalService } from '../../servicios/principal.service';
import { HorarioLogueo } from 'src/app/clases/horarioLogueo';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  odontologo = false;
  recepcionista = false;
  laboratorista = false;
  usuario: Usuario;
  urlPublica: string;
  altaUsuario =  false;
  horariosUsuario = false;
  cantidadTurnos = false;
  fechaServer: HorarioLogueo;
  filterFecha = '2019-12-11';

  listaFechasLogueo = [];
  listaTurnos = [];
  cantidadTurno: any;
  cantidadLaboratorista: any;
  cantidadOdontologo: any;

  constructor(private principalService: PrincipalService, private serviceFireStorage: FirestorageService, private authService: AuthService,
              private router: Router, auth:AuthService) {

                if (auth.usuarioLogueado == undefined) {
                  router.navigate(['Login']);
                  localStorage.usuarioLogueado = undefined;
                 } else    this.usuario = auth.usuarioLogueado;


              }
              

  ngOnInit() {
    this.usuario = new Usuario();
    this.fechaServer = new HorarioLogueo();

    this.principalService.getFechasLogueo().subscribe( resp => {
      resp.map( fecha =>  {
         this.listaFechasLogueo.push(fecha);
      });
      });

    this.principalService.getTurnos().subscribe( resp => {
      this.cantidadLaboratorista = 0;
      this.cantidadOdontologo = 0;
      resp.map(dat => {
         if (dat.especialidad == 'Laboratorista') {
             this.cantidadLaboratorista += 1;

         } else if (dat.especialidad == 'Odontologo') {
           this.cantidadOdontologo += 1;
         }

         this.listaTurnos.push(dat);

      });
    });
  }


  ngSubmit(form: NgForm) {

    if (form.invalid) { return; }
    Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Se ha registrado con exito...',
        timer: 1500
      });
      // Swal.showLoading();

    this.authService.CrearUsuario(form.value);
    this.router.navigate(['/Administrador']);
    }

  public onFileSelectd($event) {
    if ($event.target.files.length === 1) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Subiendo imagen',
        timer: 2000
        });
      Swal.showLoading();
      this.serviceFireStorage.referenciaCloudStorage($event.target.files[0].name).getDownloadURL()
       .subscribe(resp  => {
         this.urlPublica = resp + '_thumb_' + '480.' + ($event.target.files[0].type).substr(6, 3).toString();
         this.usuario.foto =  resp + '_thumb_' + '480.' + ($event.target.files[0].type).substr(6, 3).toString();

         Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Imagen cargada con exito',
          timer: 2000
          });
      });
      // (error) => {
      //   console.error(error);
      // });
      this.serviceFireStorage.tareaCloudStorage($event.target.files[0].name, $event.target.files[0]);
}
  }

}
