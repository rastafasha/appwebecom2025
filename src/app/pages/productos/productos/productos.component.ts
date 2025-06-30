import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Producto } from '../../../models/producto.model';
import { MessageService } from '../../../services/message.service';
import { ProductoService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ImagenPipe } from '../../../pipes/imagen-pipe.pipe';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { Marca } from '../../../models/marca.model';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { MarcasComponent } from '../../marcas/marcas.component';
import { UsuarioService } from '../../../services/usuario.service';



@Component({
  selector: 'app-productos',
  imports:[
    CommonModule,
    HeaderComponent,
    RouterModule,
    ImagenPipe,
    FooterComponent,
    LoadingComponent,
    MarcasComponent,

  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  public productos: Producto[]=[];
  public product!: Producto;
  public isLoading: boolean = true;
  limit: number = 6;
  display: string = 'none'
  error!: string;
  public identity;

  p: number = 1;
  count: number = 8;

  public producto : any = {};

  private http: HttpClient;
  ServerUrl = environment.baseUrl;
  imagenSerUrl = environment.mediaUrl;
  marca!: Marca ;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    handler: HttpBackend,
    private messageService: MessageService,
    public usuarioService: UsuarioService,
  ) {
    this.http = new HttpClient(handler);
    this.identity = usuarioService.usuario;
   }

  ngOnInit(): void {
    window.scrollTo(0,0);

    this.marca = new Marca('', '', '', '');
    this.marca.slug = this.activatedRoute.snapshot.paramMap.get('slug') || '';
    console.log(this.marca.slug);
    if( this.router.url === `/productos/marca/${this.marca.slug}`){
      this.loadProductbybranding();
    }else{
      this.loadProducts();
    }


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

  loadProductbybranding(){
    this.isLoading = true;
    this.productoService.find_by_branding(this.marca.slug).subscribe(
      productos => {
        this.productos = productos;
        this.isLoading = false;
      },
      error => {
        this.error = 'No hay productos para esta marca';
        this.isLoading = false;
      }
    )
  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }

  toggleFavorite(product: Producto): void {
    
    // product.isFavorite = !product.isFavorite;
    // if (product.isFavorite) {
    //   this.messageService.addToFavorites(product);
    // } else {
    //   this.messageService.removeFromFavorites(product);
    // }
  }

}
