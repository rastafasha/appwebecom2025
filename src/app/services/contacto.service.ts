import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  public url;

  constructor(
    private _http : HttpClient,
  ) {
    this.url = environment.baseUrl;
   }


   registro(data: any):Observable<any>{
    const url = `${base_url}/contactos/`;
    return this._http.post(url, data);
  }

  sendEmail(data: any):Observable<any>{

    const url = `${base_url}/contactos/send/`;
    return this._http.post(url, data);
  }
}
