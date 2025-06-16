import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';

@Component({
  selector: 'app-top-properties',
  imports: [
    CommonModule,
    ImagenPipe 
  ],
  templateUrl: './top-properties.component.html',
  styleUrl: './top-properties.component.scss'
})
export class TopPropertiesComponent {
   public productos: Producto[]=[];


  error!: string;

  public producto : any = {};

  private http: HttpClient;
  ServerUrl = environment.baseUrl;
  imagenSerUrl = environment.mediaUrl;

  constructor(
    public productoService: ProductoService,
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
    this.productoService.getProductosActivos().subscribe(
      productos => {
        this.productos = productos;
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
}
