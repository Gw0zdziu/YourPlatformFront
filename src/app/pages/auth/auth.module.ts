import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterOutlet} from '@angular/router';
import {AuthRoutingModule} from 'src/app/pages/auth/auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from 'src/app/shared/modules/material/material.module';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AuthModule { }
