import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Marca } from '../../models/marca.model';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { MarcaService } from '../../services/marca.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { SearchComponent } from '../../shared/search/search.component';

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
    NgIf,
  ],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss'
})
export class MarcasComponent {

  @Input() limit!:number;
  @Input() displaycomponent: string = 'block';
  public marcas:Marca[]=[];
  isLoading: boolean = true;
  query:string ='';

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
  handleSearchEvent(event: any) {
    if (event.marcas) {
      this.marcas = event.marcas;
    }
  }

  public PageSize(): void {
    this.query = '';
    this.loadMarcas();
  }
}
