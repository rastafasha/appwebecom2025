import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Venta, Cancelacion } from '../../../../models/ventas.model';
import { UsuarioService } from '../../../../services/usuario.service';
import { VentaService } from '../../../../services/venta.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-ordenes',
  templateUrl: './index-ordenes.component.html',
  styleUrls: ['./index-ordenes.component.css']
})
export class IndexOrdenesComponent implements OnInit {

  public usuario;
  public url:any;
  public msm_error = false;
  public msm_success = false;
  public ordenes!:Venta;
  public cancelacion!: Cancelacion;
  public ventas!: Venta;
  public venta!: Venta;
  public detalle : any = {};

  p: number = 1;
  count: number = 8;

  public id!:string;

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
   this.ventaService.listarporUser(this.usuario.uid!).subscribe(
      response=>{
        this.ventas = response.ventas;
        console.log(this.ventas);

      },
      error=>{

      }
    );
  }




  listar_cancelacion(){
    this.ventaService.listarCancelacionporUser(this.usuario.uid!).subscribe(
      response=>{
        this.cancelacion = response.cancelacion;
        console.log(this.cancelacion);
      },
      error=>{

      }
    );
  }


}
