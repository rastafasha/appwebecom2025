import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { SliderComponent } from '../../shared/slider/slider.component';
import { DestacadosComponent } from '../../components/destacados/destacados.component';
import { TopPropertiesComponent } from '../../components/top-properties/top-properties.component';
import { BestwelcomeComponent } from "../../components/bestwelcome/bestwelcome.component";
import { ExperienceComponent } from '../../components/experience/experience.component';
import { InsideComponent } from '../../components/inside/inside.component';
import { CommentsComponent } from '../../components/comments/comments.component';
import { FotofooterComponent } from '../../components/fotofooter/fotofooter.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    DestacadosComponent,
    TopPropertiesComponent,
    BestwelcomeComponent,
    ExperienceComponent,
    InsideComponent,
    CommentsComponent,
    FotofooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
