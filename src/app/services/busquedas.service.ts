import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Producto } from '../models/producto.model';
import { Curso } from '../models/curso.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(
    private http: HttpClient
  ) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }

  private trasnformarUsuarios(resultados: any[]): Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    )
  }

  private trasnformarCursos(resultados: any[]): Curso[]{
    return resultados;
  }

  private trasnformarProductos(resultados: any[]): Producto[]{
    return resultados;
  }

  buscar(tipo: 'usuarios'|'productos'|'cursos',
        termino: string
        ){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map( (resp: any) => {
          switch(tipo) {
            case 'usuarios':
              return this.trasnformarUsuarios(resp.resultados)

              case 'cursos':
                return this.trasnformarCursos(resp.resultados)

                case 'productos':
                return this.trasnformarProductos(resp.resultados)
              default:
                return[];
          }
        })
      )
  }


  searchGlobal(termino: string){
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<any[]>(url)
  }
}
