import { Component, OnInit } from '@angular/core';
import { GeneralService} from '../../servicios/general.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AppRoutingModule} from '../../app-routing.module';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servicio:GeneralService, public ruta: Router) { }

  ngOnInit() {
  }

  traerDatos()
  {
    console.log("Estoy en trater datos");
   
    this.ruta.navigateByUrl('/registro');

    // this.router.navigateByUrl('/login');

      //this.servicio.traerDatos_servicio();
  }

}
