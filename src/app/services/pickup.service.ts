import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Pickup } from '../models/pickup.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PickupService {

  public pickup!: Pickup;
  public url;

  constructor(
    private _http: HttpClient,
    private router: Router,
    ) {
      this.url = environment.baseUrl;
  }


  registro(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + '/pickups/pickup/registro',data,{headers:headers})
  }

  listar(id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/pickups/pickup/'+id,{headers:headers})
  }

  get_direccion(id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/pickups/pickup/data/'+id,{headers:headers})
  }

  update(data: { _id: string; }):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + '/pickups/pickup/update/'+data._id,data,{headers:headers})
  }

  eliminar(id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + '/pickups/pickup/remove/'+id,{headers:headers})
  }


}
