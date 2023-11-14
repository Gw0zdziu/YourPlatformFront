import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameComponent} from 'src/app/pages/game/game.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameListComponent } from './game-list/game-list.component';
import {RouterOutlet} from '@angular/router';
import {GameRoutingModule} from 'src/app/pages/game/game-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from 'src/app/shared/modules/material/material.module';
import {SharedModule} from "../../shared/shared.module";
import {AppModule} from "../../app.module";
import {GameCardComponent} from "./game-card/game-card.component";



@NgModule({
  declarations: [
    GameComponent,
    GameEditComponent,
    GameCreateComponent,
    GameDetailsComponent,
    GameListComponent,
    GameCardComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    FormsModule,
  ]
})
export class GameModule { }
