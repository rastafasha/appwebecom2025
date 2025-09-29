import { Component } from '@angular/core';
import { Tienda } from '../../models/tienda.model';
import { TiendaService } from '../../services/tienda.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-store-bar',
  imports: [
    CommonModule,
    RouterModule,
    ImagenPipe,
    LoadingComponent
  ],
  templateUrl: './store-bar.component.html',
  styleUrl: './store-bar.component.scss'
})
export class StoreBarComponent {
  public tiendas!:Tienda[] | null;
      isLoading: boolean = false;
    
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
