import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpInterceptor } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([imageInterceptor])
    ),
    provideRouter(routes),
   
  ]
};

function imageInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  // Check if the request is for an image
  if (req.url.endsWith('.jpg') || req.url.endsWith('.png') || req.url.endsWith('.jpeg')) {
   
    const jwtToken = window.localStorage.getItem('auth_token');
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return next(modifiedReq);
    
  }
  // Pass through other requests unmodified
  return next(req);
}

