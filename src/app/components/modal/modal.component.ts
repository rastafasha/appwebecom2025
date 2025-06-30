import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Galeria } from '../../models/galeria.model';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-modal',
  imports: [
    CommonModule,
    NgFor,
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() selectedProduct!: Producto;

  public galeria!: Galeria[]|null;

}
