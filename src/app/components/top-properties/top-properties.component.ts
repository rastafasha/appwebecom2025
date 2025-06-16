import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { FavoritoService } from '../../services/favorito.service';
import { Favorite } from '../../models/favorite.model';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-top-properties',
  imports: [
    CommonModule,
    ImagenPipe,
    RouterModule,
    LoadingComponent, 
  ],
  templateUrl: './top-properties.component.html',
  styleUrl: './top-properties.component.scss'
})
export class TopPropertiesComponent {
   public productos: Producto[]=[];
  isLoading:boolean= false;

  error!: string;

  public producto : any = {};

  private http: HttpClient;
  ServerUrl = environment.baseUrl;
  imagenSerUrl = environment.mediaUrl;

  favoriteItem!:Favorite;

  constructor(
    public productoService: ProductoService,
    public favoritoService: FavoritoService,
    private router: Router,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.loadProducts();


  }
  loadProducts(){
    this.isLoading = true;
    this.productoService.getProductosActivos().subscribe(
      productos => {
        this.productos = productos;
        this.isLoading = false;
        // console.log(this.productos);
      }
    )
  }

  gotoPage(){
    return this.router.navigateByUrl('/producto')
  }

  gotoProduct(_id:string ) {
    this.productoService.getProductoById(_id).subscribe(
      res =>{
        this.router.navigateByUrl('/producto/'+_id);

      }
    );
  }


// addToFavorites(producto:any){
//   // this.favoritoService.registro(this.productoSeleccionado);
//   // console.log(this.producto);
// this.producto = producto;
//   const data = {
//     producto: this.producto._id,
//     usuario: this.identity.uid,
//   }
  
//   this.favoritoService.registro(data ).subscribe((res:any)=>{
//     this.favoriteItem = res;
//     // console.log(this.favoriteItem);
//     console.log('sending...', this.producto.titulo)
//     // this.notificacion();
//     this.msm_success_fav = true;
//       setTimeout(()=>{
//         this.close_alert()
//       },2500);
    
//   });
// }
}
