import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Blog } from '../../../models/blog';
import { BlogService } from '../../../services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from '../../../pipes/imagen-pipe.pipe';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { SearchComponent } from '../../../shared/search/search.component';



@Component({
  selector: 'app-blog-list',
   imports:[
    CommonModule,
    HeaderComponent,
    RouterModule,
    ImagenPipe,
    FooterComponent,
    LoadingComponent,
    SearchComponent,
  ],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  imagenSerUrl = environment.mediaUrl;
  blogs: Blog[]=[];
  error!: {};
  p: number = 1;
  count: number = 8;
  isLoading: boolean = false;
  query:string ='';

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.isLoading = true;
    this.blogService.getBlogsActivos().subscribe(
      blogs => {
        this.blogs = blogs;
        this.isLoading = false;
      }
    )
  }

  
public PageSize(): void {
    this.query = '';
    this.ngOnInit();
  }
  


}
