import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { UniqueCategoriesPipe } from '../../pipes/unique-categories.pipe';
import { CategoryService } from '../../services/category.service';
import { Categoria } from '../../models/categoria.model';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-category-bar',
  imports: [
    CommonModule,
    RouterModule,
    NgFor,
    UniqueCategoriesPipe,
    ImagenPipe,
    LoadingComponent
  ],
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.scss']
})
export class CategoryBarComponent implements OnInit {

  public categorias!: Categoria[];
  isLoading: boolean = false;

  constructor(
    private categoriaService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.loadCategories();

  }
  loadCategories(){
    this.isLoading = true;
    this.categoriaService.getCategoriesActivas().subscribe(
      resp => {
        this.categorias = resp;
        this.isLoading = false;
        // console.log(this.categorias);


      }
    )
  }

}
