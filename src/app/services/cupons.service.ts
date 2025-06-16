import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cupon } from "../models/cupon.model";

import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  constructor(
    private http : HttpClient
  ) {
   }

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



  listar():Observable<any>{
    const url = `${base_url}/cupons`;
    return this.http.get(url, this.headers);
    }

  get_cupon(id: any):Observable<Cupon>{
    const url = `${base_url}/cupons/${id}`;
    return this.http.get<{ok: boolean, cupon: Cupon}>(url, this.headers)
    .pipe(
      map((resp) => resp.cupon)
      );
  }

  get_cuponCode(codigo: any):Observable<Cupon>{
    const url = `${base_url}/cupons/codigo/${codigo}`;
    return this.http.get<{ok: boolean, cupon: Cupon}>(url, this.headers)
    .pipe(
      map((resp) => resp.cupon)
      );
  }


}
