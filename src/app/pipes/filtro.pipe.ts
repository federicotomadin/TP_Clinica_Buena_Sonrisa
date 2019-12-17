import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, tipo: any): any {
    const resultadoUsuario = [];
    for (const item of value) {
      if (item.dniUsuario.toLowerCase().indexOf(tipo.toLowerCase()) > -1) {
       resultadoUsuario.push(item);
      }
    }
    return resultadoUsuario;
  }

}
