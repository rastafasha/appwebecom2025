import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-share-button',
  imports: [CommonModule],
  templateUrl: './share-button.component.html',
  styleUrl: './share-button.component.scss'
})
export class ShareButtonComponent {

  async shareContent() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Awesome Content',
          text: 'Check out this amazing content!',
          url: window.location.href, // Or a specific URL you want to share
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      // You can implement social media specific sharing here (e.g., open new window with a pre-filled URL)
      alert('Web Share API is not supported in this browser. You can manually copy the URL.');
    }
  }

}
