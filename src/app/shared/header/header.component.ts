import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageService } from '../../services/page.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { CarritoService } from '../../services/carrito.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    NgFor,
    ImagenPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  pages:any;
  public identity!:Usuario;
  public usuario!:any;
  public cartItemCount: number = 0;

  public carritoService = inject(CarritoService);
  public storageService =inject(StorageService) 

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
      // console.log(this.identity);
      this.loadCartItemCount();
    }
    // this.getCart();
  }

  loadCartItemCount() {
    if(this.identity && this.identity.uid){
      this.carritoService.preview_carrito(this.identity.uid).subscribe((res:any) => {
        
        this.cartItemCount = res.length;

        // if(res && res.items){
        //   this.cartItemCount = res.items.reduce((acc: number, item: any) => acc + item.quantity, 0);
        //   // console.log(this.cartItemCount);
        // } else {
        //   this.cartItemCount = 0;
        // }
      }, error => {
        console.error('Error loading cart:', error);
        this.cartItemCount = 0;
      });
    }
  }

  

  getCart(){
    this.storageService.getCart();
  }

  get iconBagColorClass(): string {
    const colors = ['icon-bag-red', 'icon-bag-black', 'icon-bag-yellow'];
    if(this.cartItemCount > 0){
      return colors[this.cartItemCount % colors.length];
    }
    return '';
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
      this.pages = data.filter((page: any) => page.origen === 'header' || page.origen === 'ambos');
     
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
