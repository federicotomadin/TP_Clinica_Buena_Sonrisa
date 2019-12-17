import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;

  constructor(private authService: AuthService,
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
    this.authService.CrearPaciente(form.value);
    this.router.navigate(['/Cliente']);
    }


}
