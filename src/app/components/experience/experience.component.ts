import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  imports: [
    CommonModule,
    
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {

  option_selected:number = 1;
  solicitud_selected:any = null;


  optionSelected(value:number){
      this.option_selected = value;
      if(this.option_selected === 1){

        // this.ngOnInit();
        this.solicitud_selected = null;
      }
      if(this.option_selected === 2){
        this.solicitud_selected = null;
      }
      if(this.option_selected === 3){
        this.solicitud_selected = null;
      }
      if(this.option_selected === 4){
        this.solicitud_selected = null;
      }
      if(this.option_selected === 5){
        this.solicitud_selected = null;
      }
    }

}
