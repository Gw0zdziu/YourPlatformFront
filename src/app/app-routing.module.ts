import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from 'src/app/pages/home/home.component';
import {InformationComponent} from 'src/app/pages/information/information.component';

const ROUTES: Routes = [
  {
    path: '',
    component: InformationComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then(x => x.CategoryModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./pages/game/game.module').then(x => x.GameModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(x => x.AuthModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
