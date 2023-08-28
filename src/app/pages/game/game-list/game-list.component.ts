import {Component, OnInit} from '@angular/core';
import {GameService} from 'src/app/shared/services/http/game/game.service';
import {GameList} from 'src/app/shared/models/http/game/GameList';
import {LoaderService} from 'src/app/shared/services/loader/loader.service';
import {GlobalService} from 'src/app/shared/services/global/global.service';
import {CategoryDetailsComponent} from "../../category/category-details/category-details.component";
import {DialogService} from "../../../shared/services/dialog/dialog.service";
import {GameDetailsComponent} from "../game-details/game-details.component";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{
  gamesList: GameList[] = []
  constructor(
    private gameSvc: GameService,
    private loaderSvc: LoaderService,
    private globalSvc: GlobalService,
    private dialogSvc: DialogService
  ) {
  }

  ngOnInit() {
    this.gameSvc.getGameByUserId().subscribe({
      next: value => {
        this.gamesList = value;
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

  openDetails(gameId: string) {
    const dialogRef = this.dialogSvc.open(GameDetailsComponent, { data: gameId });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
