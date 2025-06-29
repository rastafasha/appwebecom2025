import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { LoadingComponent } from '../../shared/loading/loading.component';


@Component({
  selector: 'app-blog-featured',
  imports: [
    CommonModule,
    RouterModule,
    ImagenPipe,
    NgFor,
    LoadingComponent
  ],
  templateUrl: './blog-featured.component.html',
  styleUrls: ['./blog-featured.component.css']
})
export class BlogFeaturedComponent implements OnInit {

  blogs: Blog[]=[];
  error!: {};
  imagenSerUrl = environment.mediaUrl;
  isLoading:boolean = false;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.blogService.getBlogs().subscribe(
      blogs => {
        this.blogs = blogs;
        this.isLoading = false;
        // console.log(this.blogs);
      }
    )
  }

}
