import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Producto } from '../../../models/producto.model';
import { MessageService } from '../../../services/message.service';
import { ProductoService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ImagenPipe } from '../../../pipes/imagen-pipe.pipe';
import { FooterComponent } from '../../../shared/footer/footer.component';



@Component({
  selector: 'app-productos',
  imports:[
    CommonModule,
    HeaderComponent,
    RouterModule,
    ImagenPipe,
    FooterComponent
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  public productos: Producto[]=[];
  public product!: Producto;


  error!: string;

  p: number = 1;
  count: number = 8;

  public producto : any = {};

  private http: HttpClient;
  ServerUrl = environment.baseUrl;
  imagenSerUrl = environment.mediaUrl;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    handler: HttpBackend,
    private messageService: MessageService
  ) {
    this.http = new HttpClient(handler);
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.loadProducts();
    window.scrollTo(0,0);


  }
  loadProducts(){
    this.productoService.getProductosActivos().subscribe(
      productos => {
        this.productos = productos;
        // console.log(this.productos);
      }
    )
  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }

}
