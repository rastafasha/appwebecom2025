import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Slider } from '../../models/slider.model';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'app-slider',
  imports: [
    CommonModule,RouterModule, NgFor,
    ImagenPipe, NgClass
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {

  sliders!: Slider[];
    imagenSerUrl = environment.mediaUrl;

    currentSlide = 0;
  
  
    constructor(
      public sliderService: SliderService,
      public http: HttpClient
    ) { }
  
    ngOnInit(): void {
      this.obtenerSliders();
  
    }
  
    obtenerSliders(){
      return this.sliderService.getSliders().subscribe(
        resp=>{
          this.sliders = resp;
          console.log(this.sliders);
        }
      )
    }

    selectSlide(index: number) {
    this.currentSlide = index;
  }

   prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.sliders.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.sliders.length - 1) ? 0 : this.currentSlide + 1;
  }

}
