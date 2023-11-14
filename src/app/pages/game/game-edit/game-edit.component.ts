import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GameService} from "../../../shared/services/http/game/game.service";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, findIndex, map, mergeMap, Observable, startWith} from "rxjs";
import {CategoryNames} from "../../../shared/models/http/category/CategoryNames";
import {NotificationService} from "../../../shared/services/snackbar/notification.service";
import {CategoryService} from "../../../shared/services/http/category/category.service";
import {UpdateGame} from "../../../shared/models/http/game/UpdateGame";

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit{
  gameForm: FormGroup
  gameId: string | null
  filteredOptions?: Observable<CategoryNames[] | undefined> | undefined
  categoriesNames$: Observable<CategoryNames[]>
  categoryName: string;
  categoryId: string;


  constructor(
    private fb:FormBuilder,
    private gameSvc: GameService,
    private categorySvc: CategoryService,
    private route: ActivatedRoute,
    private notificationSvc: NotificationService,
    private router: Router
  ) {
    this.gameForm = this.fb.group({
      gameName: ['', Validators.required],
      gameDesc: [''],
      gameRating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      categoryId: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('gameId')
    this.categoriesNames$ = this.categorySvc.categoriesNames$;
    this.gameSvc.getGameById(this.gameId).subscribe({
      next: value => {
        this.categoryId = value.categoryId
        this.gameForm.get('gameName')?.setValue(value.gameName)
        this.gameForm.get('gameDesc')?.setValue(value.gameDesc)
        this.gameForm.get('gameRating')?.setValue(value.gameRating)
        this.gameForm.get('categoryId')?.setValue(value.categoryId)
        /*this.categorySvc.getCategoryById(this.categoryId).subscribe({
          next: value1 => {
            this.categoryName = value1.categoryName
            this.gameForm.get('categoryId')?.setValue(value1.categoryId)
          }
        })*/
      },
      error: err => {
        this.notificationSvc.openNotification(err)
      }
    })

    this.filteredOptions = this.gameForm.get('categoryId')?.valueChanges.pipe(
      startWith(''),
      mergeMap(value  => this.categoriesNames$.pipe(
          map(categories => categories.filter(category => category.categoryName.toLowerCase() === value.toLowerCase()))
      ))
    )
  }

  displayFn(category: CategoryNames): string {
      return category ? category.categoryName : '';
    }
  onSubmit(){
    const updatedGame: UpdateGame = {
      gameName: this.gameForm.get('gameName')?.value,
      gameDesc: this.gameForm.get('gameDesc')?.value,
      gameRating: this.gameForm.get('gameRating')?.value,
      categoryId: this.gameForm.get('categoryId')?.value.categoryId,
    }
    this.gameSvc.updateGame(this.gameId, updatedGame).subscribe({
      next: () => {
        this.notificationSvc.openNotification('Pomyślnie zaktualizowano grę')
        this.router.navigate(['/game/list'])
      },
      error: err => {
        this.notificationSvc.openNotification(err)
      }
    })
  }

}
