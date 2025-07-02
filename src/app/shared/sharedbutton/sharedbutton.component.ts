import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sharedbutton',
  templateUrl: './sharedbutton.component.html',
  styleUrls: ['./sharedbutton.component.scss']
})
export class SharedbuttonComponent {
  @Input() url: string = '';
  @Input() title: string = '';
}
