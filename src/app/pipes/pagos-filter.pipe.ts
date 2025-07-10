import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagosFilter',
})
export class PagosFilterPipe implements PipeTransform {
  constructor() {
    //
  }
  transform<T extends { tipo: string }>(metodos_pago: T[]): T[] {
    return metodos_pago.filter((metodo_pago) => 
        metodo_pago.tipo === 'cheque ' 
    );
  }
}
