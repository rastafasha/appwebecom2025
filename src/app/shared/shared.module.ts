import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedbuttonComponent } from './sharedbutton/sharedbutton.component';
import { ShareButtonsModule } from '@ngx-share/buttons';

@NgModule({
  declarations: [
    SharedbuttonComponent
  ],
  imports: [
    CommonModule,
    ShareButtonsModule
  ],
  exports: [
    SharedbuttonComponent
  ]
})
export class SharedModule { }
