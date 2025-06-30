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

  sliders!: Slider[]|null;
    imagenSerUrl = environment.mediaUrl;

    
  
  
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

}
