import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Blog } from '../models/blog';
import { environment } from '../../environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BlogService {


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


  getBlogs(){

    const url = `${base_url}/blogs`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, blogs: Blog[]}) => resp.blogs)
      )

  }


  getBlogById(_id: string){
    const url = `${base_url}/blogs/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, blog: Blog}) => resp.blog)
        );

  }





}
