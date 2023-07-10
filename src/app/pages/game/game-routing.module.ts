import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from 'src/app/pages/game/game.component';
import {GameListComponent} from 'src/app/pages/game/game-list/game-list.component';
import {GameDetailsComponent} from 'src/app/pages/game/game-details/game-details.component';
import {GameEditComponent} from 'src/app/pages/game/game-edit/game-edit.component';
import {GameCreateComponent} from 'src/app/pages/game/game-create/game-create.component';

const ROUTES: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: 'list',
        component: GameListComponent
      },
      {
        path: 'details',
        component: GameDetailsComponent,
      },
      {
        path: 'edit',
        component: GameEditComponent,
      },
      {
        path: 'create',
        component: GameCreateComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class GameRoutingModule { }
