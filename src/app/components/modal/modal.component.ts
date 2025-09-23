import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Galeria } from '../../models/galeria.model';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';

@Component({
  selector: 'app-modal',
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    ImagenPipe
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() selectedProduct!: Galeria;

  ngOnInit(){
    console.log('Modal opened with product:', this.selectedProduct);
  }
}
