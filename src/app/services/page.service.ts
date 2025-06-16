import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Params, Router } from '@angular/router';
import { About } from '../models/page';
import { map } from 'rxjs/operators';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PageService {


  public serverUrl: string;
  public media!: string;


  constructor(private http: HttpClient, public router: Router) {
    this.serverUrl = environment.baseUrl;
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

  getPages() {
    const url = `${base_url}/pages`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, pages: About[]}) => resp.pages)
      )
  }

  getPage(_id: string) {
    const url = `${base_url}/pages/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, page: About}) => resp.page)
        );
  }




}
