import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-bar',
  imports:[
    CommonModule, RouterModule, 
     NgFor,
  ],
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.scss']
})
export class CategoryBarComponent implements OnInit {

  public categorias: any;

  constructor(
    private categoriaService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.loadCategories();

  }
  loadCategories(){
    this.categoriaService.getCategoriesActivas().subscribe(
      resp => {
        this.categorias = resp;
        // console.log(this.categorias);


      }
    )
  }

}
