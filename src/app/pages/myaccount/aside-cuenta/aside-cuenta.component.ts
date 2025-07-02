import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { ImagenPipe } from '../../../pipes/imagen-pipe.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aside-cuenta',
  imports:[ImagenPipe,
    RouterModule
  ],
  templateUrl: './aside-cuenta.component.html',
  styleUrls: ['./aside-cuenta.component.css']
})
export class AsideCuentaComponent implements OnInit {

  public url!:string;
  public usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService,
  ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
  }

}
