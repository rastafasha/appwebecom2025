import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { RecoveryComponent } from './recovery/recovery.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoveryComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    RecoveryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class AuthModule { }
