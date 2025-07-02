import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Direccion } from '../../../models/direccion.model';
import { DireccionService } from '../../../services/direccion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { AsideCuentaComponent } from '../aside-cuenta/aside-cuenta.component';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-direcciones',
  imports:[
    CommonModule,
    HeaderComponent,
    FooterComponent,
    AsideCuentaComponent,
    RouterModule


  ],
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  public usuario;
  public url!:string;
  public paises:any;
  public data_paises : any = [];
  public direccion = new Direccion('','','','','','','','');

  public msm_error = false;
  public msm_success = false;
  public direcciones! : Direccion[];
  public direccion_data : any = {};
  public msm_success_dos = false;

  direccionid: Direccion;


  constructor(
    private usuarioService: UsuarioService,
    private _direccionService: DireccionService,
    private _router : Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.usuario = usuarioService.usuario;
    this.direccionid = _direccionService.direccionid;
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.listar();
  }



  listar(){
    const uid: string = this.usuario.uid ?? '';
    this._direccionService.listarUsuario(uid).subscribe(
      response =>{
        this.direcciones = response;
        console.log(this.direcciones);
      },
      error=>{

      }
    );
  }

  get_direccion(_id:string){
    this._direccionService.get_direccion(_id).subscribe(
      response =>{
        this.direccionid = response;
        console.log(this.direccionid);

      },
      error=>{

      }
    );
  }
  close_alert(){
    this.msm_error = false;
    this.msm_success = false;
    this.msm_success_dos = false;
  }



  eliminar(id:string){
    this._direccionService.eliminar(id).subscribe(
      response=>{

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.listar();
      },
      error=>{

      }
    );
  }
}
