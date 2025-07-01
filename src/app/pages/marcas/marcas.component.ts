import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Marca } from '../../models/marca.model';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { MarcaService } from '../../services/marca.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-marcas',
  imports: [
    CommonModule,
    RouterModule,
    NgFor,
    HeaderComponent,
    FooterComponent,
    ImagenPipe,
    LoadingComponent,
    NgIf
  ],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss'
})
export class MarcasComponent {

  public marcas!:Marca[] | null;
  isLoading: boolean = true;
  @Input() limit!:number;
  @Input() display: string = 'block';

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
