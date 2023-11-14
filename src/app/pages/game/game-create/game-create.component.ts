import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from 'src/app/shared/services/http/game/game.service';
import {CategoryService} from 'src/app/shared/services/http/category/category.service';
import {elementAt, map, mergeMap, Observable, startWith} from 'rxjs';
import {CategoryNames} from 'src/app/shared/models/http/category/CategoryNames';
import {untagTsFile} from '@angular/compiler-cli/src/ngtsc/shims';
import {NewGame} from 'src/app/shared/models/http/game/NewGame';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {NotificationService} from 'src/app/shared/services/snackbar/notification.service';
import {Route, Router} from '@angular/router';
import {CategoryList} from "../../../shared/models/http/category/CategoryList";

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit{
  gameForm: FormGroup
  filteredOptions?: Observable<CategoryNames[] | undefined>
  categoriesNames$: Observable<CategoryNames[]>

  constructor(
    private fb: FormBuilder,
    private gameSvc: GameService,
    private categorySvc: CategoryService,
    private authSvc: AuthService,
    private notificationSvc: NotificationService,
    private router: Router,
    ) {
    this.gameForm = this.fb.group({
      gameName: ['', Validators.required],
      gameDesc: [''],
      gameRating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      categoryId: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.categoriesNames$ = this.categorySvc.categoriesNames$;
    this.filteredOptions = this.gameForm.get('categoryId')?.valueChanges.pipe(
        startWith(''),
        mergeMap(value  => this.categoriesNames$.pipe(
            map(categories => categories.filter(category => category.categoryName.toLowerCase() === value.toLowerCase()))
        ))
    )
  }

  displayFn(category: CategoryNames) {
    if (category){
      return category.categoryName;
    } else {
      return '';
    }
  }
  onSubmit(){
    const newGame: NewGame = {
      gameName: this.gameForm.get('gameName')?.value,
      gameDesc: this.gameForm.get('gameDesc')?.value,
      gameRating: this.gameForm.get('gameRating')?.value,
      userId: this.authSvc.userValue?.userId,
      categoryId: this.gameForm.get('categoryId')?.value.categoryId
    }
    console.log(newGame)
    this.gameSvc.createGame(newGame).subscribe({
      next: () => {
        this.notificationSvc.openNotification('Pomyślnie utworzono kategorie')
        this.router.navigate(['/game/list'])
      },
      error: err => {
        this.notificationSvc.openNotification(err);
      }
    })
  }

}
