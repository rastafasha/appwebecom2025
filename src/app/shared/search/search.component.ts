import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
    selector: 'app-search',
    imports:[
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    @Input() query: string = '';
    @Input() placeholder: string = 'Buscar...';
    @Input() searchType: string = '';

    @Input() colleccion!: 'productos' | 'usuarios' | 'cursos' |'blogs';
    @Input() modelo!:any;

    resultados: any[] = [];

    @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() resetEvent: EventEmitter<void> = new EventEmitter<void>();

    isLoading:boolean =false;
    constructor (
        public busquedaService: BusquedasService,
    ) {}

    // search() {
    //     this.searchEvent.emit(this.query);
    // }

      search(query:string){
        this.searchEvent.emit(query);
        this.isLoading = true;
            this.busquedaService.buscar(this.colleccion, query)
            .subscribe( (resultados: any) => {
              if (Array.isArray(resultados)) {
                  this.resultados = resultados as any[];
                if (resultados.length === 0 || (resultados[0] && 'titulo' in resultados[0])) {
                  this.resultados = resultados as any[];
                } else {
                  this.resultados = [];
                }
              } else {
                this.resultados = [];
              }
              this.isLoading = false;
            })
          }

    reset() {
        this.query = '';
        this.resetEvent.emit();
    }
}
