import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/product.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';

@Component({
  selector: 'app-destacados',
  imports: [
    CommonModule, RouterModule, ImagenPipe
  ],
  templateUrl: './destacados.component.html',
  styleUrl: './destacados.component.scss'
})
export class DestacadosComponent {
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
    this.productoService.getProductosDestacados().subscribe(
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
