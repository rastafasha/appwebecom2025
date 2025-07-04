import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Promocion } from '../../models/promocion.model';
import { ImagenPipe } from '../../pipes/imagen-pipe.pipe';
import { PromocionService } from '../../services/promocion.service';

declare let tns: any;
declare let countdown: any;

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-promocion',
  imports:[
    CommonModule, RouterModule, ImagenPipe,
     NgFor,
  ],
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit {

  promocion!: Promocion;
  promociones!: Promocion[];
  imagenUrl = environment.baseUrl;
  today: Date = new Date();
  currentSlide = 0;

  countdownValues: { [key: number]: { days: number; hours: number; minutes: number; seconds: number } } = {};

  constructor(
    private promocionService: PromocionService
  ) { }

  ngOnInit(): void {
    this.data_banner();
  }

  startCountdown(index: number, fecha: string | number | Date) {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    let countDown = new Date(fecha).getTime();

    const updateCountdown = () => {
      let now = new Date().getTime();
      let distance = countDown - now;

      if (distance < 0) {
        this.countdownValues[index] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return;
      }

      this.countdownValues[index] = {
        days: Math.floor(distance / day),
        hours: Math.floor((distance % day) / hour),
        minutes: Math.floor((distance % hour) / minute),
        seconds: Math.floor((distance % minute) / second)
      };
    };

    updateCountdown();
    setInterval(updateCountdown, second);
  }

  data_banner() {
    this.promocionService.cargarPromocionsActive().subscribe(
      (response: any) => {
        this.promocion = response[0];
        this.promociones = response;
        this.promociones.forEach((promo, index) => {
          this.startCountdown(index, promo.end);
        });

        if (new Date(this.promocion.end) < this.today) {
          this.promocion.estado = false;
        }
      }
    );
  }

  selectSlide(index: number) {
    this.currentSlide = index;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.promociones.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.promociones.length - 1) ? 0 : this.currentSlide + 1;
  }

}
