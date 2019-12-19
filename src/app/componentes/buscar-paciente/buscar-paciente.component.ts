import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/clases/usuario';
import { PrincipalService } from '../../servicios/principal.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';




@Component({
  selector: 'app-buscar-paciente',
  templateUrl: './buscar-paciente.component.html',
  styleUrls: ['./buscar-paciente.component.css']
})
export class BuscarPacienteComponent implements OnInit {

  public dniPaciente: any;
  public listaPacientes = [];
  public resultadosBusqueda = [];
  public historiaClinicaActiva: any;

  constructor(private auth: AuthService, private ser: PrincipalService) {
    window["buscar"] = this
  }

  ngOnInit() {
    this.ser.traerUsuarios();
    this.ser.usuarios.subscribe((e) => {
      this.listaPacientes=e;
    });
  }

  buscar() {
    this.historiaClinicaActiva = [];
    this.resultadosBusqueda = [];
    for (let i = 0; i < this.listaPacientes.length; i++) {
      
        
        if (this.listaPacientes[i].dniUsuario == this.dniPaciente) {
          this.resultadosBusqueda.push(this.listaPacientes[i]);
        }


    }
   if(this.resultadosBusqueda.length==0) this.resultadosBusqueda=this.listaPacientes;
  }


  mostrarHistoriaClinica(dni: any) {


// alert(dni)

    this.ser.getHistoraClinica().subscribe(resp => {
      resp.map(dat => {
         if (dat.dniPaciente == dni) {
           console.log(dat);
           this.historiaClinicaActiva.push(dat);
         }
      });
    });

    // this.ser.historiaClinica.subscribe((e)=>{
      
    //   this.historiaClinicaActiva=e.filter(a=>a.dniPaciente==dni);

    // });
  }

  DescargarPdf() {

    const doc = new jsPDF('p', 'pt') as JsPDFWithPlugin;
    interface JsPDFWithPlugin extends jsPDF {
      autoTable: (options: UserOptions) => jsPDF;
    }
    doc.autoTable({html: '#tablaHistoriaClinica'});
    doc.save('automoviles.pdf');
  }

}

