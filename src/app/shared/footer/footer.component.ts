import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PageService } from '../../services/page.service';
import { CongeneralService } from '../../services/congeneral.service';
import { Congeneral, Redes } from '../../models/congeneral.model';
import { About } from '../../models/page.model';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    RouterModule,
    NgFor,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  year = new Date().getFullYear();
  pages: About[] = [];
  pagesmenu: About[] = [];
  public congeneral: Congeneral;
  isLoading: boolean = false;
  congeneral_id!: string;
  redessociales!: Redes[]|null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pageService: PageService,
    private congeneralService: CongeneralService,

  ) {
    this.congeneral = congeneralService.congeneral;
  }

  ngOnInit() {
    this.getPages();
    this.getCongenerals();
    
  }

  getPages() {
    this.pageService.getPages().subscribe((data: any) => {
      this.pages = data as About[];
      //filtramos los que traen el origen 'footer'
      this.pages = this.pages.filter((page: any) => page.origen === 'footer');
      this.pagesmenu = data.filter((page: any) => page.origen === 'ambos');
      // console.log(this.pagesmenu);
      //ordenamos por createdAt de forma descendente
      // this.pages.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      //tomamos los primeros
      // this.pages = this.pages.slice(0, 2);
    }, (error: any) => {
      console.error('Error fetching pages:', error);
      this.pages = [];
      
    });
  }
  getPageBySlug(slug: string) {
    this.pageService.getPageBySlug(slug).subscribe({
      next: (resp) => {
        this.router.navigate(['/page', resp._id]);
      },
      error: (err) => {
        console.error('Error fetching page by slug:', err);
      }
    });
  }
  getCongenerals(){
  this.isLoading = true;
  this.congeneralService.cargarCongenerals().subscribe((resp:any)=>{

    this.congeneral_id = resp[0]._id as string;
    // console.log('resp',resp);
    // console.log('congeneral_id',this.congeneral_id);
   this.redessociales = resp[0].redessociales;

    // const redes = resp[0].redessociales;
    // this.redessociales = Array.isArray(redes) ? redes : redes ? [redes] : [];
    // console.log(this.redessociales);
    
  })
}

}
