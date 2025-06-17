import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  currentSlide = 0;

  comments = [
    {
      text: 'Lorem2 ipsum dolor sit amet consectetur adipisicing elit. Porro atque voluptatem perspiciatis obcaecati, nisi ut mollitia.',
      userImg: './assets/img/user1.png',
      stars: [1, 1, 1, 1, 0.5]
    },
    {
      text: 'Lorem4 ipsum dolor sit amet consectetur adipisicing elit. Porro atque voluptatem perspiciatis obcaecati, nisi ut mollitia.',
      userImg: './assets/img/user2.png',
      stars: [1, 1, 1, 1, 0.5]
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro atque voluptatem perspiciatis obcaecati, nisi ut mollitia.',
      userImg: './assets/img/user3.png',
      stars: [1, 1, 1, 1, 0.5]
    }
  ];

  selectSlide(index: number) {
    this.currentSlide = index;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.comments.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.comments.length - 1) ? 0 : this.currentSlide + 1;
  }
}
