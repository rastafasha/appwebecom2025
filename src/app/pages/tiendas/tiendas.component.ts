import { Component } from '@angular/core';
import { Tienda } from '../../models/tienda.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { TiendaService } from '../../services/tienda.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-tiendas',
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
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.scss'
})
export class TiendasComponent {

   public tiendas!:Tienda[] | null;
    isLoading: boolean = true;
  
    constructor(
      private tiendaService: TiendaService
    ) {
      this.tiendas = [];
      this.loadtiendas();
    }
    loadtiendas(){
      this.isLoading = true;
      this.tiendaService.cargarTiendas().subscribe(
        tiendas => {
          this.tiendas = tiendas;
          // exclude app movil y web
          this.tiendas = this.tiendas.filter(tienda => tienda.nombre !== 'Appmovil' && tienda.nombre !== 'Web');
          // sort by orden
          this.isLoading = false;
        }
      )
    }

}
