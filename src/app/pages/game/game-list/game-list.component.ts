import {Component, OnInit} from '@angular/core';
import {GameService} from 'src/app/shared/services/http/game/game.service';
import {GameList} from 'src/app/shared/models/http/game/GameList';
import {LoaderService} from 'src/app/shared/services/loader/loader.service';
import {GlobalService} from 'src/app/shared/services/global/global.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{
  displayedColumns: string[] = ['gameName', 'gameDesc', 'gameRating', 'categoryName', 'actions']
  gamesList: GameList[]
  constructor(
    private gameSvc: GameService,
    private loaderSvc: LoaderService,
    private globalSvc: GlobalService
  ) {
  }

  ngOnInit() {
    this.gameSvc.getGameByUserId().subscribe({
      next: value => {
        this.gamesList = value
      }
    })
  }

  deleteGame(gameId: string): void{
    this.gameSvc.deleteGame(gameId).subscribe({
      next: () => {
        this.loaderSvc.show()
        this.globalSvc.refresh()
        this.loaderSvc.hide()
      },
      error: () => {
        this.loaderSvc.hide()
      }
    })
  }

}
