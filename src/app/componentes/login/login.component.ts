import { Component, OnInit } from '@angular/core';
import { GeneralService} from '../../servicios/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servicio:GeneralService) { }

  ngOnInit() {
  }

  traerDatos()
  {
      this.servicio.traerDatos_servicio();
  }

}
