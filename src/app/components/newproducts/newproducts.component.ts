import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { ProductoService } from '../../services/product.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
@Component({
  selector: 'app-newproducts',
  imports: [
    CommonModule,
    RouterModule,
    ImagenPipe,
    LoadingComponent
  ],
  templateUrl: './newproducts.component.html',
  styleUrl: './newproducts.component.scss'
})
export class NewproductsComponent {
  identity:any;
  news_productos:Producto[]=[];
  isLoading:boolean= false;
  public producto : any = {};

  constructor(
      public productoService: ProductoService,
  ){
this.listarNewest();
  }

  ngOninit(): void{
    
  }

   listarNewest(){
    this.isLoading = true;
    this.productoService.listar_newest().subscribe((resp:any)=>{
      this.news_productos = this.shuffle(resp);
      this.isLoading = false;
    })

  }

  private shuffle(array: any[]): any[] {
    if (!array || array.length === 0) {
      return [];
    }
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
}
