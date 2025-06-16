import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Promocion } from '../../models/promocion.model';
import { PromocionService } from '../../services/promocion.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';

declare let tns: any;
declare let countdown: any;

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-promocion',
  imports:[
    CommonModule, RouterModule, ImagenPipe
  ],
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit {

  promocion!: Promocion;
  // public promocion:any=[];
  imagenUrl = environment.baseUrl;

  constructor(
    private promocionService: PromocionService
  ) { }

  ngOnInit(): void {
    this.data_banner();
  }

  data_countdown(fecha: string | number | Date){
    const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;


    let countDown = new Date(fecha).getTime(),
      x = setInterval(function() {

      let now = new Date().getTime(),
      distance = countDown - now;

      $('#count_dias').text(Math.floor(distance / (day))),
        $('#count_horas').text(Math.floor((distance % (day)) / (hour))),
        $('#count_min').text(Math.floor((distance % (hour)) / (minute))),
        $('#count_seg').text(Math.floor((distance % (minute)) / second))


      }, second)
  }

  data_banner(){

    this.promocionService.cargarPromocionsActive().subscribe(
      (response:any) =>{
        console.log(response);
        this.promocion = response[0];
        this.data_countdown(this.promocion.end);

      },error=>{

      }
    );
  }

}
