import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameList} from "../../../shared/models/http/game/GameList";
import {PaginationComponent} from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  @Input() game: GameList
  @Output() gameIdToDelete = new EventEmitter<string>();
  @Output() gameIdToSee = new EventEmitter<string>();


  deleteGame(gameId: string): void{
    this.gameIdToDelete.emit(gameId);
  }

  seeGameDetails(gameId: string): void{
    this.gameIdToSee.emit(gameId)
  }
}
