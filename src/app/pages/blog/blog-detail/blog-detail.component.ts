import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Blog } from '../../../models/blog';
import { Categoria } from '../../../models/categoria.model';
import { Congeneral } from '../../../models/congeneral.model';
import { BlogService } from '../../../services/blog.service';
import { CategoryService } from '../../../services/category.service';
import { CongeneralService } from '../../../services/congeneral.service';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from '../../../pipes/imagen-pipe.pipe';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { UsuarioService } from '../../../services/usuario.service';
import { BlogFeaturedComponent } from "../../../components/blog-featured/blog-featured.component";
import { SharedbuttonComponent } from '../../../shared/sharedbutton/sharedbutton.component';
import { ShareButtonComponent } from "../../../components/share-button/share-button.component";

@Component({
  selector: 'app-blog-detail',
  imports: [
    CommonModule,
    HeaderComponent,
    RouterModule,
    ImagenPipe,
    FooterComponent,
    LoadingComponent,
    SharedbuttonComponent,
    ShareButtonComponent
],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  imagenSerUrl = environment.mediaUrl;
  siteOrigin: string = window.location.origin;

  blog!: Blog;
  blogrecientes!: Blog[];
  categories!: Categoria[];
  isLoading: boolean = false;

  configuraciones!: Congeneral;
  configuracion!: Congeneral;
  identity: any;


  constructor(
    public blogService: BlogService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public categoryService: CategoryService,
    private messageService: MessageService,
    public configuracionService: CongeneralService,
    public usuarioService: UsuarioService,
  ) { 
    this.identity = usuarioService.usuario;
  }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({slug}) => this.obtenerBlog(slug));
    this.obtenerCategorias();
    this.obtenerBlogRecent();
  }

  obtenerBlog(slug:string){
    this.isLoading = true;
    this.blogService.getBlogBySlug(slug).subscribe(
      resp=>{
        this.blog = resp;
        this.isLoading = false;
      }
    )
  }

  obtenerBlogRecent(){
    this.blogService.getBlogs().subscribe(
      resp=>{
        this.blogrecientes = resp;
      }
    )
  }

  obtenerCategorias(){
    return this.categoryService.getCategories().subscribe(
      resp=>{
        this.categories = resp;
        console.log(this.categories);
      }
    )
  }
}
