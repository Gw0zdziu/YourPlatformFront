import {Component} from '@angular/core';
import {GameService} from 'src/app/shared/services/http/game/game.service';
import {DialogService} from "../../../shared/services/dialog/dialog.service";
import {GameDetailsComponent} from "../game-details/game-details.component";
import {BehaviorSubject, combineLatestWith, map, tap} from "rxjs";
import {CategoryService} from "../../../shared/services/http/category/category.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent {
  emptyListGameMessage = 'Brak gier';
  selectedCategorySubject = new BehaviorSubject<string>('0');
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
        }),tap(x => console.log(x))

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
