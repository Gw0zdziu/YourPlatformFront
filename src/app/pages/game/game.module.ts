import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameComponent} from 'src/app/pages/game/game.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameListComponent } from './game-list/game-list.component';
import {RouterOutlet} from '@angular/router';
import {GameRoutingModule} from 'src/app/pages/game/game-routing.module';



@NgModule({
  declarations: [
    GameComponent,
    GameEditComponent,
    GameCreateComponent,
    GameDetailsComponent,
    GameListComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    RouterOutlet
  ]
})
export class GameModule { }
