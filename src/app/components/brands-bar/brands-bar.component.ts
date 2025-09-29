import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Marca } from '../../models/marca.model';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { MarcaService } from '../../services/marca.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-brands-bar',
  imports: [
    CommonModule,
    RouterModule,
    ImagenPipe,
    LoadingComponent
  ],
  templateUrl: './brands-bar.component.html',
  styleUrl: './brands-bar.component.scss'
})
export class BrandsBarComponent {
  public marcas:Marca[]=[];
  isLoading: boolean = true;
  constructor(
      private marcaService: MarcaService
    ) {
      this.marcas = [];
      this.loadMarcas();
    }
    loadMarcas(){
      this.isLoading = true;
      this.marcaService.cargarMarcas().subscribe(
        marcas => {
          this.marcas = marcas;
          // console.log(this.marcas);
          this.isLoading = false;
        }
      )
    }
}
