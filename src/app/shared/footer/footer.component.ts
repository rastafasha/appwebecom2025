import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  pages:any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pageService: PageService
  ) {}

  ngOnInit() {
    this.pageService.getPages().subscribe((data: any) => {
      this.pages = data;
      
    });
  }

}
