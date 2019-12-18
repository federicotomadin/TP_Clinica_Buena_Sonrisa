import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, fecha: any): any {
    const resultadoFecha = [];

    const anio = fecha.substr(0, 4);
    const mes = fecha.substr(5, 2);
    const dia = fecha.substr(8, 2);

    // console.log(dia, mes, anio);

    for (const item of value) {

     const fec =  new Date(item.horarioSalida);
     const diaIngreso = fec.toDateString().substr(8, 2);
     const anioIngreso = fec.getUTCFullYear();
     const mesIngreso =   fec.getUTCMonth() + 1;

    //  console.log(diaIngreso, anioIngreso, mesIngreso);

     if (dia == diaIngreso && mes == mesIngreso && anio == anioIngreso) {

      resultadoFecha.push(item);
    }
    }

    if (resultadoFecha.length !== 0) {
      return resultadoFecha;
    } else { return value; }

}
}
