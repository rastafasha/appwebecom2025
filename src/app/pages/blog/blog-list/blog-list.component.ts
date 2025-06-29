import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Blog } from '../../../models/blog';
import { BlogService } from '../../../services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from '../../../pipes/imagen-pipe.pipe';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';



@Component({
  selector: 'app-blog-list',
   imports:[
    CommonModule,
    HeaderComponent,
    RouterModule,
    ImagenPipe,
    FooterComponent
  ],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  imagenSerUrl = environment.mediaUrl;
  blogs: Blog[]=[];
  error!: {};
  p: number = 1;
  count: number = 8;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.blogService.getBlogs().subscribe(
      blogs => {
        this.blogs = blogs;
        console.log(this.blogs);
      }
    )
  }


}
