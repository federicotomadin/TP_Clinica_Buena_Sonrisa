import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

import { FirestorageService } from '../../servicios/firestorage.service';
import { Usuario } from 'src/app/clases/usuario';

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

  constructor(private serviceFireStorage: FirestorageService, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new Usuario();
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
      }, (error) => {
        console.error(error);
      });
      this.serviceFireStorage.tareaCloudStorage($event.target.files[0].name, $event.target.files[0]);
}
  }

}