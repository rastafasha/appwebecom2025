import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// import Drift from 'drift-zoom';
import { ColorService } from "../../../services/color.service";
import { environment } from '../../../../environments/environment';
import { Categoria } from '../../../models/categoria.model';
import { Favorite } from '../../../models/favorite.model';
import { Producto } from '../../../models/producto.model';
import { CarritoService } from '../../../services/carrito.service';
import { CategoryService } from '../../../services/category.service';
import { ComentarioService } from '../../../services/comentario.service';
import { FavoritoService } from '../../../services/favorito.service';
import { GaleriaService } from '../../../services/galeria.service';
import { MessageService } from '../../../services/message.service';
import { ProductoService } from '../../../services/product.service';
import { SelectorService } from '../../../services/selector.service';
import { UsuarioService } from '../../../services/usuario.service';
import { VentaService } from '../../../services/venta.service';
import { WebSocketService } from '../../../services/web-socket.service';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from '../../../pipes/imagen-pipe.pipe';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { NewproductsComponent } from '../../../components/newproducts/newproducts.component';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-producto',
  imports:[
    CommonModule,
    HeaderComponent,
    RouterModule,
    ImagenPipe,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
    NewproductsComponent
  ],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: any = [];
  categories!: Categoria[];

  option_selected:number = 1;
  solicitud_selected:any = null;

  // public socket = io(environment.soketServer);

  
  public slug!: Producto;
  public selectores : any = [];
  public galeria : any = [];
  public colores : any = [];
  public url;
  public img_select:any;
  public first_img:any;
  public cantidad_to_cart = 1;
  public precio_to_cart:any;
  public color_to_cart = '#16537e';
  public selector_to_cart = ' ';
  public err_stock ='';
  public selector_error = false;
  public identity;
  public isLoading:boolean = false;

  public comentarios :any=[];

  /*COMENTARIOS DATA */
  public cinco_estrellas = 0;
  public cuatro_estrellas = 0;
  public tres_estrellas = 0;
  public dos_estrellas = 0;
  public una_estrella = 0;

  public cinco_porcent = 0;
  public cuatro_porcent = 0;
  public tres_porcent = 0;
  public dos_porcent = 0;
  public uno_porcent = 0;
  public raiting_porcent = 0;
  public total_puntos = 0;
  public max_puntos = 0;
  public raiting_puntos= 0;

  /*PAGINATE COMENTS */
  public page:any;
  public pageSize = 5;
  public count_cat:any;
  public sort_data_coment = 'raiting';

  /*FORM RESEÑA */
  public id_review_producto:any;
  public review_comentario='';
  public review_pros='';
  public review_cons='';
  public review_estrellas='';
  
  public msm_error_review='';
  public msm_error = false;
  public msm_success_fav = false;
  public msm_success = false;
  productoSeleccionado!:Producto;
  favoriteItem!: Favorite;

  public get_state_user_producto_coment = false;

  /*NEWST */

  public news_productos : any = {};

  public data_cupon:any;

  constructor(
    public productoService: ProductoService,
    public categoryService: CategoryService,
    public usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public router: Router,
    private sanitizer: DomSanitizer,
    private _galeriaService : GaleriaService,
    private _colorService :ColorService,
    private _selectorService : SelectorService,
    private _ventaService: VentaService,
    private _carritoService: CarritoService,
    private _comentarioService: ComentarioService,
    private favoritoService: FavoritoService,
    private webSocketService: WebSocketService,
  ) {
    this.url = environment.baseUrl;
    this.identity = usuarioService.usuario;
  }


  click_img(img: any,id: string){

    $('.cz-thumblist-item.active').removeClass('active');
    $('#'+id).addClass('active');
    this.first_img = img;

  }

  get_color(color: { color: string; }){
    this.color_to_cart = color.color;
    console.log(this.color_to_cart);
  }
  // get_color(event,color){
  //   this.color_to_cart = color.color;
  //   console.log(this.color_to_cart);
  // }

  sort_coments(){
    this._comentarioService.get_data(this.producto._id,this.sort_data_coment).subscribe(
      response =>{

        this.comentarios = response.comentarios;

        this.count_cat = this.comentarios.length;
        this.page = 1;

        this.comentarios.forEach((element: { _id: string; likes: any; dislikes: any; }) => {
          this._comentarioService.get_likes(element._id).subscribe(
            response =>{
              element.likes = response.data.length;
            },
            error=>{

            }
          );

          this._comentarioService.get_dislikes(element._id).subscribe(
            response =>{
              element.dislikes = response.data.length;
            },
            error=>{

            }
          );
        });
        console.log(this.comentarios);

      },
      error=>{
        console.log(error);

      }
    );
  }

  data_comentarios(){
    this._comentarioService.get_data(this.producto._id,"raiting").subscribe(
      response =>{

        this.comentarios = response.comentarios;
        console.log(this.comentarios);


        this.count_cat = this.comentarios.length;
        this.page = 1;

        this.comentarios.forEach((element: { _id: string; likes: any; dislikes: any; }) => {
          this._comentarioService.get_likes(element._id).subscribe(
            response =>{
              element.likes = response.data.length;
            },
            error=>{

            }
          );

          this._comentarioService.get_dislikes(element._id).subscribe(
              response =>{
                element.dislikes = response.data.length;
              },
              error=>{

              }
            );
          });
        console.log(this.comentarios);


        this.comentarios.forEach((element: { estrellas: number; },index: any) => {
          if(element.estrellas == 5){
            this.cinco_estrellas = this.cinco_estrellas + 1;
          }
          else if(element.estrellas == 4){
            this.cuatro_estrellas = this.cuatro_estrellas + 1;
          }
          else if(element.estrellas == 3){
            this.tres_estrellas = this.tres_estrellas + 1;
          }
          else if(element.estrellas == 2){
            this.dos_estrellas = this.dos_estrellas + 1;
          }
          else if(element.estrellas == 3){
            this.una_estrella = this.una_estrella + 1;
          }
        });

        this.cinco_porcent = (this.cinco_estrellas*100)/this.comentarios.length;
        this.cuatro_porcent = (this.cuatro_estrellas*100)/this.comentarios.length;
        this.tres_porcent = (this.tres_estrellas*100)/this.comentarios.length;
        this.dos_porcent = (this.dos_estrellas*100)/this.comentarios.length;
        this.uno_porcent = (this.una_estrella*100)/this.comentarios.length;

        /******************************************************************* */

        let puntos_cinco = 0;
        let puntos_cuatro = 0;
        let puntos_tres = 0;
        let puntos_dos = 0;
        let punto_uno = 0;

        puntos_cinco = this.cinco_estrellas * 5;
        puntos_cuatro = this.cuatro_estrellas * 4;
        puntos_tres = this.tres_estrellas * 3;
        puntos_dos = this.dos_estrellas * 2;
        punto_uno = this.una_estrella * 1;

        this.total_puntos = puntos_cinco + puntos_cuatro + puntos_tres + puntos_dos + punto_uno;
        this.max_puntos = this.comentarios.length * 5;

        this.raiting_porcent =(this.total_puntos*100)/this.max_puntos;

        this.raiting_puntos =(this.raiting_porcent*5)/100;

        if(isNaN(this.raiting_puntos)){
          this.raiting_puntos = 0;
        }
        if(isNaN(this.raiting_porcent)){
          this.raiting_porcent = 0;
        }

      },
      error=>{
        console.log(error);

      }
    );
  }

 


  ngOnInit(): void {

    window.scrollTo(0,0);
    
    this.activatedRoute.params.subscribe( ({id}) => this.obtenerProducto(id));
    this.activatedRoute.params.subscribe( ({id}) => this.init_data(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getGalleryProducto(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getColorProducto(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getSelectorProducto(id));
    this.obtenerCategorias();

    // this.socket.on('new-stock', function (data: any) {
    //   this.init_data();

    // }.bind(this));

    // new Drift(document.querySelector('#active_img_thumb'), {
		// 	paneContainer: document.querySelector('.cz-image-zoom-pane'),
		// 	inlinePane: 900,
		// 	inlineOffsetY: -85,
		// 	containInline: true,
		// 	hoverBoundingBox: true
    // });


    // this.activatedRoute.params.subscribe(
    //   params=>{
    //     this.slug = params['slug'];

    //     this.init_data();
    //     // this.obtenerProducto();

    //   }
    // );

    // this.listar_newest();

    if(!this.identity){
      this.router.navigateByUrl('/login');
    }

  }

   optionSelected(value:number){
      this.option_selected = value;
      if(this.option_selected === 1){

        // this.ngOnInit();
        this.solicitud_selected = null;
      }
      if(this.option_selected === 2){
        this.solicitud_selected = null;
      }
      if(this.option_selected === 3){
        this.solicitud_selected = null;
      }
    }

  init_data(_id:string){
    this.productoService.getProductoById(_id).subscribe(
      response =>{
        this.producto = response;


        if(this.identity && this.identity.uid){
          this._ventaService.evaluar_venta_user(this.identity.uid, this.producto._id).subscribe(
            response =>{
              this.get_state_user_producto_coment = response.data;
            },
            error=>{

            }
          );
        }

        this.data_comentarios();

        $('#detalle').html(this.producto.detalle);
        // $('#video_iframe').append(this.producto.video_review);
        // $('iframe').removeAttr('height');
        // $('iframe').attr('height','400px');


        this.precio_to_cart = this.producto.precio_ahora;


      },
      error=>{

      }
    );
  }

  getGalleryProducto(_id:string){
    this._galeriaService.find_by_product(_id).subscribe(
      response =>{
        response.galeria.forEach((element: { imagen: any; _id: any; },index: number) => {
          if(index == 0){
            this.first_img = element.imagen;
          }
            this.galeria.push({_id:element._id,imagen : element.imagen});
        });
        console.log(this.galeria);
      },
      error=>{
        console.log(error);

      }
    );
  }

  getColorProducto(_id:string){
    this._colorService.colorByProduct(_id).subscribe(
      response =>{
        this.colores = response;
        this.color_to_cart = this.colores[0].color;
        // console.log(response);

      },
      error=>{

      }
    );
  }

  getSelectorProducto(_id:string){
    this._selectorService.selectorByProduct(_id).subscribe(
      response =>{
        this.selectores = response;
        console.log(this.selectores);

      },
      error=>{

      }
    );
  }

  obtenerProducto(_id:string){
    this.isLoading = true;
    this.productoService.getProductoById(_id).subscribe(
      resp=>{
        this.producto = resp;
        this.isLoading = false;
      }
    )
  }

  obtenerCategorias(){
    return this.categoryService.getCategories().subscribe(
      resp=>{
        this.categories = resp;
        // console.log(this.categories);
      }
    )
  }

  // addToCart(): void{
  //   console.log('sending...')
  //   this.messageService.sendMessage(this.producto);
  // }

  getVideoIframe(url: string | null) {
    var video, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
}

add_to_cart(carritoForm: any){
  if(this.cantidad_to_cart > this.producto.stock){
    this.err_stock = 'La cantidad no debe superar al stock';
  }
  else if(this.cantidad_to_cart <= 0){
    this.err_stock = 'La cantidad no puede ser un valor negativo';
  }
  else{
    this.err_stock = '';
    let data = {
      user: this.identity.uid,
      producto : this.producto._id,
      cantidad : this.cantidad_to_cart,
      color : this.color_to_cart,
      selector : this.selector_to_cart,
      precio : this.precio_to_cart
    }
    if(this.selector_to_cart != " "){
      this.selector_error = false;
      this._carritoService.registro(data).subscribe(
        response =>{
          // this.socket.emit('save-carrito', {new:true});

          // $('#dark-toast').removeClass('hide');
          // $('#dark-toast').addClass('show');
          // setTimeout(function() {
          //     $("#dark-toast").fadeOut(1500);
          // },3000);
          this.msm_success = true;
          setTimeout(()=>{
            this.close_alert()
          },2500);
        },
        error=>{

        }
      );
    }else{
      this.selector_error = true;
    }
  }

}


add_likes(idcoment: any){

  let data = {
    comentario : idcoment,
    user : this.identity.uid
  }

  this._comentarioService.add_likes(data).subscribe(
    response =>{
      this.comentarios.forEach((element: { _id: string; likes: any; }) => {
        this._comentarioService.get_likes(element._id).subscribe(
          response =>{
            element.likes = response.data.length;
          },
          error=>{

          }
        );
      });

    },
    error=>{
      console.log(error);

    }
  );
}

add_dislikes(idcoment: any){

  let data = {
    comentario : idcoment,
    user : this.identity.uid
  }

  this._comentarioService.add_dislikes(data).subscribe(
    response =>{
      this.comentarios.forEach((element: { _id: string; dislikes: any; }) => {
        this._comentarioService.get_dislikes(element._id).subscribe(
          response =>{
            element.dislikes = response.data.length;
          },
          error=>{

          }
        );
      });

    },
    error=>{
      console.log(error);

    }
  );
}

saveComent(reviewForm: { valid: any; value: { review_comentario: any; review_pros: any; review_cons: any; review_estrellas: any; }; }){
  if(reviewForm.valid){

    let data = {
      comentario: reviewForm.value.review_comentario,
      pros: reviewForm.value.review_pros,
      cons: reviewForm.value.review_cons,
      estrellas: reviewForm.value.review_estrellas,
      user: this.identity.uid,
      producto: this.producto._id,
    }
    this._comentarioService.registro(data).subscribe(
      response =>{
        this.msm_error_review = '';
        this.id_review_producto='';
        this.review_comentario='';
        this.review_pros='';
        this.review_cons='';
        this.review_estrellas='';
      },
      error=>{
        this.msm_error_review = error.error.message;
        this.id_review_producto='';
        this.review_comentario='';
        this.review_pros='';
        this.review_cons='';
        this.review_estrellas='';
      }
    );

  }else{
    this.msm_error_review = 'Complete correctamente los campos.';
  }
}




close_toast(){
  $('#dark-toast').removeClass('show');
      $('#dark-toast').addClass('hide');
}


addToFavorites(producto:any){
  // this.favoritoService.registro(this.productoSeleccionado);
  // console.log(this.producto);
this.productoSeleccionado = producto;
  const data = {
    producto: this.productoSeleccionado._id,
    usuario: this.identity.uid,
  }
  
  this.favoritoService.registro(data ).subscribe((res:any)=>{
    this.favoriteItem = res;
    // console.log(this.favoriteItem);
    console.log('sending...', this.productoSeleccionado.titulo)
    // this.notificacion();
    this.msm_success_fav = true;
      setTimeout(()=>{
        this.close_alert()
      },2500);
    
  });
}

close_alert(){
  this.msm_error = false;
  this.msm_error_review = '';
  this.msm_success_fav = false;
  this.msm_success = false;
}




}
