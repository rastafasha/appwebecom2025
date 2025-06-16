import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Shipping } from '../models/shipping.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  public shipping!: Shipping;
  public url;

  constructor(
    private _http: HttpClient,
    private router: Router,
    ) {
      this.url = environment.baseUrl;
  }


  registro(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + '/shippings/shipping/registro',data,{headers:headers})
  }

  listar(id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/shippings/shippings/'+id,{headers:headers})
  }

  get_direccion(id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/shippings/shipping/data/'+id,{headers:headers})
  }

  update(data: { _id: string; }):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + '/shippings/shipping/update/'+data._id,data,{headers:headers})
  }

  eliminar(id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + '/shippings/shipping/remove/'+id,{headers:headers})
  }


}
