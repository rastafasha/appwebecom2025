import { Component, OnInit } from '@angular/core';
import {environment} from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/services/usuario.service';
import {VentaService} from '../../../services/venta.service';
import { Cancelacion, Venta } from 'src/app/models/ventas.model';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-ordenes',
  templateUrl: './index-ordenes.component.html',
  styleUrls: ['./index-ordenes.component.css']
})
export class IndexOrdenesComponent implements OnInit {

  public usuario;
  public url;
  public msm_error = false;
  public msm_success = false;
  public ordenes:Venta;
  public cancelacion: Cancelacion;
  public ventas: Venta;
  public venta: Venta;
  public detalle : any = {};

  p: number = 1;
  count: number = 8;

  public id;

  constructor(
    private usuarioService: UsuarioService,
    private _router : Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private ventaService: VentaService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    if(this.usuario){
      this.listar_ventas();
      this.listar_cancelacion();
      this.url = environment.baseUrl;
    }else{
      this._router.navigate(['/']);
    }

  }

  listar_ventas(){
   this.ventaService.listarporUser(this.usuario.uid).subscribe(
      response=>{
        this.ventas = response.ventas;
        console.log(this.ventas);

      },
      error=>{

      }
    );
  }




  listar_cancelacion(){
    this.ventaService.listarCancelacionporUser(this.usuario.uid).subscribe(
      response=>{
        this.cancelacion = response.cancelacion;
        console.log(this.cancelacion);
      },
      error=>{

      }
    );
  }


}
