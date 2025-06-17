import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { ProductoService } from '../../services/product.service';

@Component({
  selector: 'app-newproducts',
  imports: [
    CommonModule,
    RouterModule,
    ImagenPipe
  ],
  templateUrl: './newproducts.component.html',
  styleUrl: './newproducts.component.scss'
})
export class NewproductsComponent {
  identity:any;
  news_productos!:Producto[]|null;

  constructor(
      public productoService: ProductoService,
  ){

  }

  ngOninit(){
    this.listar_newest();
  }

   listar_newest(){
    this.productoService.listar_newest().subscribe(
      response =>{
        this.news_productos = response.data;
        console.log(this.news_productos);
      },
      error=>{

      }
    );
  }
}
