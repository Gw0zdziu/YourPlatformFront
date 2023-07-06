import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from 'src/app/app.component';
import {HomeComponent} from 'src/app/pages/home/home.component';
import {CategoryComponent} from 'src/app/pages/category/category.component';
import {GameComponent} from 'src/app/pages/game/game.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
  ]
})
export class AppRoutingModule { }
