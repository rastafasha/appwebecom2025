import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Galeria } from '../../models/galeria.model';
import { Producto } from '../../models/producto.model';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { GaleriaService } from '../../services/galeria.service';

@Component({
  selector: 'app-modal',
  imports: [
    CommonModule,
    NgFor,
    ImagenPipe
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() selectedProduct!: Galeria;
  public galeria!: Galeria[]|null;
  private _galeriaService= inject(GaleriaService)
  public img_select:any;
  public first_img:any;

  ngOnInit(){
    console.log(this.selectedProduct);
    // this.getGalleryProducto();
  }

  getGalleryProducto(){
    if (this.selectedProduct && this.selectedProduct._id) {
      this._galeriaService.find_by_product(this.selectedProduct._id).subscribe(
        response =>{
          this.galeria = []; // Ensure galeria is an array before pushing
          response.galeria.forEach((element: { imagen: any; _id: any; },index: number) => {
            if(index == 0){
              this.first_img = element.imagen;
            }
              // this.galeria.push({_id:element._id,imagen : element.imagen});
          });
        },
        error=>{
          console.log(error);

        }
      );
    } else {
      console.error('selectedProduct._id is undefined');
    }
  }

}
