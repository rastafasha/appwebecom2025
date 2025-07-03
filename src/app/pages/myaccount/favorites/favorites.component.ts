import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { Usuario } from '../../../models/usuario.model';
import { FavoritoService } from '../../../services/favorito.service';
import { UsuarioService } from '../../../services/usuario.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { ImagenPipe } from '../../../pipes/imagen-pipe.pipe';


@Component({
  selector: 'app-favorites',
  imports:[
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ImagenPipe
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public identity!: Usuario;
  public productos!: Producto;
  public favoritos: any =[];
  public msm_success_fav = false;
  constructor(
    private http: HttpClient,
    private location: Location,
    public favoritosService: FavoritoService,
    public usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
      let USER = localStorage.getItem('user');
    if(USER){
      this.identity = JSON.parse(USER);
      console.log(this.identity);
    }
     }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.getFavoritos();
  }

  getFavoritos(){
    this.favoritosService.listarFaoritosporUsuario(this.identity.uid).subscribe((resp:any)=>{
      this.favoritos = resp.favoritos;
      console.log(this.favoritos);

    })
  }

  removeFavorito(_id:string){
    this.favoritosService.eliminar(_id).subscribe(
      res=>{
        // console.log(res);
        
        this.msm_success_fav = true;
        this.getFavoritos();
        setTimeout(()=>{
          this.close_alert()
        },2500);

      }
    );
  }

  close_alert(){
    this.msm_success_fav = false;
    // this.getFavoritos();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
