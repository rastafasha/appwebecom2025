import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageService } from '../../services/page.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    NgFor
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  pages:any;
  public identity!:Usuario;
  public usuario!:any;

  constructor(private pageService: PageService,
    public usuarioService: UsuarioService,
  ) {
    // this.identity = usuarioService.getUser();
  }

  ngOnInit(){
    this.getPages();
    let USER = localStorage.getItem('user');
    if(USER){
      this.identity = JSON.parse(USER);
      console.log(this.identity);
    }
  }


 openMenu() {
    const menuLateral = document.getElementsByClassName("sidemenu");
    for (let i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.add("active");
    }
  }

  closeMenu() {
    const menuLateral = document.getElementsByClassName("sidemenu");
    for (let i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.remove("active");
    }
  }
  logout(){
    this.usuarioService.logout();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPages() {
    this.pageService.getPages().subscribe((data: any) => {
      this.pages = data;
      // console.log(data);
      //filtramos los que traen el origen 'header o ambos'
      this.pages = this.pages.filter((page: any) => page.origen === 'header' || page.origen === 'ambos');

      // console.log(this.pages);
      //ordenamos por createdAt de forma descendente
      // this.pages.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      //tomamos los primeros
      // this.pages = this.pages.slice(0, 3);
    }, (error: any) => {
      console.error('Error fetching pages:', error);
      this.pages = [];
      
    });
  }

}
