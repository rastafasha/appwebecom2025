import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Ticket } from '../models/ticket.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const base_url = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public url;
  public ticket!: Ticket;

  constructor(
    private _http : HttpClient
  )
  {
    this.url = environment.baseUrl;
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

  registro(data: any):Observable<any>{
    const url = `${base_url}/tickets/`;
    return this._http.post(url, data, this.headers);
  }

  send(data: any):Observable<any>{

    const url = `${base_url}//tickets/ticket_msm/send`;
    return this._http.post(url, data, this.headers);

  }

  listar(id: any):Observable<any>{

    const url = `${base_url}/tickets/ticket_listar/listar/${id}`;
    return this._http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, ticket: Ticket}) => resp.ticket)
        );
  }

  data(de: any,para: any):Observable<any>{
    // let headers = new HttpHeaders().set('Content-Type','application/json');
    // return this._http.get(this.url + '/tickets/ticket_chat/chat/'+de+'/'+para,{headers:headers})

    const url = `${base_url}/tickets/ticket_chat/chat/${de}/${para}`;
    return this._http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, ticket: Ticket}) => resp.ticket)
        );
  }

  get_ticket(id:string):Observable<any>{

    const url = `${base_url}/tickets/ticket_data/one/${id}`;
    return this._http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, ticket: Ticket}) => resp.ticket)
        );
  }

  get_tickets_admin(status: any,estado: any){
    // let headers = new HttpHeaders().set('Content-Type','application/json');
    // return this._http.get(this.url + '/tickets/ticket_admin/all/'+status+'/'+estado,{headers:headers});

    const url = `${base_url}/tickets/ticket_admin/all/${status}/${estado}`;
    return this._http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, ticket: Ticket}) => resp.ticket)
        );
  }
}
