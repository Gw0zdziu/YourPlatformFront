import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from 'src/app/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {AuthModule} from 'src/app/pages/auth/auth.module';
import {CategoryModule} from 'src/app/pages/category/category.module';
import {GameModule} from 'src/app/pages/game/game.module';
import { InformationComponent } from './pages/information/information.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from 'src/app/shared/helpers/interceptors/jwt/jwt.interceptor';
import {LoaderInterceptor} from 'src/app/shared/helpers/interceptors/loader/loader.interceptor';
import {ErrorInterceptor} from "./shared/helpers/interceptors/error/error.interceptor";
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InformationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterOutlet,
    RouterLink,
    AppRoutingModule,
    AuthModule,
    CategoryModule,
    GameModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
    {
        provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
