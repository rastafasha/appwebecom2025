
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { AsideCuentaComponent } from './aside-cuenta/aside-cuenta.component';

@Component({
  selector: 'app-myaccount',
  imports: [
    HeaderComponent,
    FooterComponent,
    AsideCuentaComponent

  ],
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css'],
})
export class MyaccountComponent implements OnInit {

  usuario: Usuario;
  imagenSerUrl = environment.mediaUrl;

  constructor(
    public router: Router,
    public http: HttpClient,
    private usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.usuario;
    console.log(this.usuario);
  }





}
