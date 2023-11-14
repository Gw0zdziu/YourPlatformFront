import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {GameService} from 'src/app/shared/services/http/game/game.service';
import {LoaderService} from 'src/app/shared/services/loader/loader.service';
import {DialogService} from "../../../shared/services/dialog/dialog.service";
import {GameDetailsComponent} from "../game-details/game-details.component";
import {BehaviorSubject, combineLatestWith, EMPTY, filter, map, Observable} from "rxjs";
import {CategoryNames} from "../../../shared/models/http/category/CategoryNames";
import {GameList} from "../../../shared/models/http/game/GameList";
import {CategoryService} from "../../../shared/services/http/category/category.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent {
  selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategory$ = this.selectedCategorySubject.asObservable();
  constructor(
    private gameSvc: GameService,
    private categorySvc: CategoryService,
    private dialogSvc: DialogService,
  ) {
  }
  categoriesNameList$ = this.categorySvc.categoriesNames$
  gamesList$ = this.gameSvc.gamesUser$.pipe(
        combineLatestWith(this.selectedCategory$),
        map(([games, selectedCategory]) => {
          if (selectedCategory === '0'){
            return games
          } else {
            return games.filter(game => game.categoryId === selectedCategory)
          }
        })
    )


  onSelectedCategory(categoryId: string){
    this.selectedCategorySubject.next(categoryId)
  }
  deleteGame(gameId: string): void{
    this.gameSvc.deleteGame(gameId).subscribe({
      next: () => {
        this.gamesList$ = this.gamesList$.pipe(
            map(gamesList =>{
               return gamesList.filter( game => game.gameId !== gameId)
            })
        )
      },
      error: () => {
      },
      complete: () => {
      }
    })
  }

  openDetails(gameId: string) {
    const dialogRef = this.dialogSvc.open(GameDetailsComponent, { data: gameId });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
