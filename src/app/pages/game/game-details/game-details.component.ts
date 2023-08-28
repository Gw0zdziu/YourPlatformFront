import {Component, Inject, OnInit} from '@angular/core';
import {GameList} from "../../../shared/models/http/game/GameList";
import {GameService} from "../../../shared/services/http/game/game.service";
import {ActivatedRoute} from "@angular/router";
import {GameData} from "../../../shared/models/http/game/GameData";
import {CategoryService} from "../../../shared/services/http/category/category.service";
import {DIALOG_DATA} from "../../../shared/services/dialog/dialog-tokens";
import {DialogRef} from "../../../shared/services/dialog/dialogRef";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit{
  gameId: string | null
  game: GameData
  categoryName: string

  constructor(
    private gameSvc: GameService,
    private categorySvc: CategoryService,
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: string
  ) {
  }

  ngOnInit() {
    this.gameSvc.getGameById(this.data).subscribe({
      next: value => {
        this.game = value
        this.categorySvc.getCategoryById(value.categoryId).subscribe({
          next: value1 => {
            this.categoryName = value1.categoryName
          }
        })
      }
    })
  }

  close() {
    this.dialogRef.close();
  }
}
