import {Component, OnInit} from '@angular/core';
import {GameList} from "../../../shared/models/http/game/GameList";
import {GameService} from "../../../shared/services/http/game/game.service";
import {ActivatedRoute} from "@angular/router";
import {GameData} from "../../../shared/models/http/game/GameData";
import {CategoryService} from "../../../shared/services/http/category/category.service";

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
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('gameId')
    this.gameSvc.getGameById(this.gameId).subscribe({
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
}
