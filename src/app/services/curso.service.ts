import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Params, Router } from '@angular/router';
import { Curso } from '../models/curso.model';
import { map } from 'rxjs/operators';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  public curso!: Curso;
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

  getCursos() {
    const url = `${base_url}/cursos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, cursos: Curso[]}) => resp.cursos)
      )
  }

  getCurso(_id: string) {
    const url = `${base_url}/cursos/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, curso: Curso}) => resp.curso)
        );
  }

  getFeaturedCursos() {
    return this.http.get<Curso>(this.serverUrl + '/cursos/').pipe(
      catchError(this.handleError)
    );
  }
getRecentCursos() {
  return this.http.get<Curso>(this.serverUrl + '/cursos/').pipe(
    catchError(this.handleError)
  );
}

listar_newest():Observable<any>{
  const url = `${base_url}/cursos/cursos_nuevos/show_curso`;
  return this.http.get(url,  this.headers);
}

aumentar_ventas(id: any):Observable<any>{

  const url = `${base_url}/cursos/cursos_ventas/aumentar/${id}`;
  return this.http.get<any>(url, this.headers)
  .pipe(
    map((resp:{ok: boolean, curso_data: Curso}) => resp.curso_data)
    );
}


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
