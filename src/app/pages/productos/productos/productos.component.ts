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
import { UsuarioService } from '../../../services/usuario.service';

import { Location } from '@angular/common';
import { Tienda } from '../../../models/tienda.model';
import { TiendaService } from '../../../services/tienda.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusquedasService } from '../../../services/busquedas.service';
import { SearchComponent } from '../../../shared/search/search.component';
import { Categoria } from '../../../models/categoria.model';

@Component({
  selector: 'app-productos',
  imports:[
    CommonModule,
    HeaderComponent,
    RouterModule,
    ImagenPipe,
    FooterComponent,
    LoadingComponent,
    FormsModule,
    ReactiveFormsModule,
    SearchComponent

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
  categoria!: Categoria ;
  tienda!: Tienda ;
  public productosTemp: Producto[] = [];

  query:string ='';
  searchForm!:FormGroup;
  currentPage = 1;
  collecion='productos';
  catname!:string;

  constructor(
    public productoService: ProductoService,
    public usuarioService: UsuarioService,
    public tiendaService: TiendaService,
    public busquedaService: BusquedasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    handler: HttpBackend,
    private location: Location,
  ) {
    this.http = new HttpClient(handler);
    this.identity = usuarioService.usuario;
   }

  ngOnInit(): void {
    window.scrollTo(0,0);

    this.activatedRoute.paramMap.subscribe(params => {
      this.marca = new Marca('', '', '', '');
      this.marca.slug = params.get('slug') || '';
      this.categoria = new Categoria('', '', false, '','');
      this.categoria.nombre = params.get('nombre') || '';
      if(this.marca.slug){
        this.loadProductbybranding();
      }
      else if(this.categoria.nombre){
        this.catname = this.categoria.nombre;
        this.loadProductbyCategory();
      }
       else {
        this.tienda = new Tienda('', '', '', '', false, '');
        this.tienda._id = params.get('id') || '';
        if(this.tienda._id){
          this.loadProductbyStore();
        } else {
          this.loadProducts();
        }
      }
    });

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

  loadProductbyCategory(){
    this.isLoading = true;
    this.productoService.getProductoByCategoryName(this.catname).subscribe(productos=>{
      this.productos = productos;
    //  console.log(productos)
      this.isLoading = false;

    },
  error => {
        this.error = 'No hay productos para esta categoría';
        this.isLoading = false;
      })
  }
  loadProductbyStore(){
    this.isLoading = true;
    this.productoService.find_by_storeId(this.tienda._id).subscribe(
      productos => {
        this.productos = productos;
        console.log(this.productos);
        this.isLoading = false;
        if(this.productos.length === 0 ){
          this.error = 'No hay productos para esta tienda';
        }
      },
      error => {
        this.error = 'No hay productos para esta tienda';
        this.isLoading = false;
      },
      
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

  goBack() {
        this.location.back(); // <-- go back to previous location on cancel
      }

  public PageSize(): void {
    this.query = '';
    this.ngOnInit();
  }

  handleSearchEvent(event: any) {
    if (event.productos) {
      this.productos = event.productos;
    }
  }

}
