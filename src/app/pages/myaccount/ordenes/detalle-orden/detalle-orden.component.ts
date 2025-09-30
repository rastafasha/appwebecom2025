import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ComentarioService } from '../../../../services/comentario.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { VentaService } from '../../../../services/venta.service';
import { Usuario } from '../../../../models/usuario.model';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AsideCuentaComponent } from '../../aside-cuenta/aside-cuenta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagenPipe } from '../../../../pipes/imagen-pipe.pipe';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-detalle-orden',
  imports:[
    HeaderComponent,
    FooterComponent,
    CommonModule,
    AsideCuentaComponent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ImagenPipe,
    LoadingComponent

  ],
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  public identity!: Usuario | null;
  public url!:string;
  public msm_error = false;
  public msm_success = false;
  public isLoading = false;
  public id!:string;
  public detalle : any = {};
  public venta : any = {};

  public id_review_producto!:string;
  public review_comentario='';
  public review_pros='';
  public review_cons='';
  public review_estrellas='';
  public select_detalle='';

  public msm_error_review='';
  public data_comentarios : Array<any> = [];
  public btn_cancelar!:string;

  public cancelacion : any = {};
  public msm_error_cancelar = '';
  public data_cancelacion : any = {};

  constructor(
    private _userService: UsuarioService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient,
    private _ventaService: VentaService,
    private _comentarioService : ComentarioService
  ) {
     let USER = localStorage.getItem('user');
    if(USER){
      this.identity = JSON.parse(USER);
    }
  }

  modal_data(idproducto:string,id:string){
    this.id_review_producto = idproducto;
    this.select_detalle = id;
    this.msm_error_review = '';
    this.review_comentario='';
    this.review_pros='';
    this.review_cons='';
    this.review_estrellas='';
  }



  ngOnInit(): void {

    if(this.identity){
      this.url = environment.baseUrl;
      this._route.params.subscribe(
        params=>{
          this.id = params['id'];
          this.init_data();
          this.get_cancelacion();

        }
      );

      this.cancelacion = {
        mensaje: '',
        user : this.identity.uid,
        venta : this.id
      };

    }else{
      this._router.navigate(['/']);
    }

  }

  init_data(){
    this.isLoading = true;
    this._ventaService.detalle(this.id).subscribe(
      response =>{
        this.detalle = response.detalle;
        this.venta = response.venta;
        this.isLoading = false;
        this.data_reviews();
        this.evaluar_cancelacion();
      },
      error=>{
      }
    );
  }

  get_cancelacion(){

    this._ventaService.listarCancelacionporUser(this.id).subscribe(
      response =>{
        this.data_cancelacion = response.cancelacion;


      },
      error =>{
        this.data_cancelacion = null;

      }
    );
  }

  evaluar_cancelacion(){
    this._ventaService.evaluar_cancelacion(this.id).subscribe(
      response =>{
        this.btn_cancelar = response.data;
      },
      error =>{

      }
    );
  }

  finalizar(id:string){
    this._ventaService.finalizar(id).subscribe(
      response =>{
        this._ventaService.detalle(this.id).subscribe(
          response =>{
            this.detalle = response.detalle;
            this.venta = response.venta;
            $('#finalizar').modal('hide');
            $('.modal-backdrop').removeClass('show');
            this.data_reviews();

          },
          error=>{

          }
        );
      },
      error=>{

      }
    );
  }

  cancelar(cancelarForm:any){
    if(cancelarForm.valid){
      this.msm_error_cancelar = '';
      this.cancelacion.mensaje = cancelarForm.value.mensaje;

      this._ventaService.cancelar(this.cancelacion).subscribe(
        response =>{
          $('#sol_cancelar').modal('hide');
          $('.modal-backdrop').removeClass('show');
          this.evaluar_cancelacion();
          this.init_data();
          this.get_cancelacion();
        },
        error=>{
          console.log(error);

        }
      );
    }else{
      this.msm_error_cancelar = 'Escribe el motivo de la cancelación.'
    }
  }

  data_reviews(){
    this._comentarioService.listar().subscribe(
      response =>{
        interface Comentario {
          producto: string;
          user: string;
        }

        interface ComentariosResponse {
          comentarios: Array<{ producto: string; user: string }>;
        }

        (response as ComentariosResponse).comentarios.forEach((element: { producto: string; user: string }) => {
          this.data_comentarios.push({
            producto: element.producto,
            user: element.user
          } as Comentario);
        });


      },
      error=>{


      }
    );
  }

  logout(){

    localStorage.removeItem('token');
    localStorage.removeItem('identity');

    this.identity = null;

    this._router.navigate(['/']);
  }

  saveComent(reviewForm:any){
    if(reviewForm.valid){

      if (!this.identity) {
        this.msm_error_review = 'Usuario no autenticado.';
        return;
      }
      let data = {
        comentario: reviewForm.value.review_comentario,
        pros: reviewForm.value.review_pros,
        cons: reviewForm.value.review_cons,
        estrellas: reviewForm.value.review_estrellas,
        user: this.identity.uid,
        producto: this.id_review_producto,
      }
      this._comentarioService.registro(data).subscribe(
        response =>{
          this.msm_error_review = '';
          this.id_review_producto='';
          this.review_comentario='';
          this.review_pros='';
          this.review_cons='';
          this.review_estrellas='';
          $('#save-'+this.select_detalle).modal('hide');
          $('.modal-backdrop').removeClass('show');
          this.select_detalle = '';
        },
        error=>{
          this.msm_error_review = error.error.message;

        }
      );

    }else{
      this.msm_error_review = 'Complete correctamente los campos.';
    }
  }

  close_alert(){
    this.msm_error_review = '';
    this.msm_error_cancelar = '';
  }


}
