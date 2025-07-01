import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageService } from '../../services/page.service';

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

  constructor(private pageService: PageService,) {
    
  }

  ngOnInit(){
    this.getPages();
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
