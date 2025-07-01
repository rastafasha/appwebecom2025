import { Component } from '@angular/core';
import { PageService } from '../../services/page.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Blog } from '../../models/blog';
import { Categoria } from '../../models/categoria.model';
import { Congeneral } from '../../models/congeneral.model';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-generic-page',
  imports: [
    CommonModule,
        HeaderComponent,
        RouterModule,
        ImagenPipe,
        FooterComponent,
        LoadingComponent,
  ],
  templateUrl: './generic-page.component.html',
  styleUrl: './generic-page.component.scss'
})
export class GenericPageComponent {

  imagenSerUrl = environment.mediaUrl;
  
    page!: any; // Assuming the page model is similar to About
    blogrecientes!: Blog[];
    categories!: Categoria[];
    isLoading: boolean = false;
  
    configuraciones!: Congeneral;
    configuracion!: Congeneral;
    identity: any;
  
  
    constructor(
      public pageService: PageService,
      public router: Router,
      public activatedRoute: ActivatedRoute,
      public usuarioService: UsuarioService,
    ) { 
      this.identity = usuarioService.usuario;
    }
  
    ngOnInit(): void {
  
      window.scrollTo(0,0);
      this.activatedRoute.params.subscribe( ({slug}) => this.obtenerBlog(slug));
    }
  
    obtenerBlog(slug:string){
      this.isLoading = true;
      this.pageService.getPageBySlug(slug).subscribe(
        resp=>{
          this.page = resp;
          this.isLoading = false;
        }
      )
    }
  
  

}
