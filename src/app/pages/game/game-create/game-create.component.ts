import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from 'src/app/shared/services/http/game/game.service';
import {CategoryService} from 'src/app/shared/services/http/category/category.service';
import {elementAt, map, Observable, startWith} from 'rxjs';
import {CategoryNames} from 'src/app/shared/models/http/category/CategoryNames';
import {untagTsFile} from '@angular/compiler-cli/src/ngtsc/shims';
import {NewGame} from 'src/app/shared/models/http/game/NewGame';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {NotificationService} from 'src/app/shared/services/snackbar/notification.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit{
  gameForm: FormGroup
  filteredOptions?: Observable<CategoryNames[] | undefined>
  category: CategoryNames[] = []

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
    this.categorySvc.getCategoriesNames().subscribe({
      next: value => {
        this.category = value;
      }
    })
    this.filteredOptions = this.gameForm.get('categoryId')?.valueChanges.pipe(
      startWith(''),
      map(value  => this._filter(value || ''))
    )
  }

  displayFn(categoryId: string): string {
    if (!categoryId){
      return ''
    } else {
      let index = this.category.findIndex(x => x.categoryId === categoryId)
      if (index > -1){
        return this.category[index].categoryName
      } else {
        return ''
      }
    }
  }

  private _filter(value: string): CategoryNames[] {
    const filterValue = value.toLowerCase();
      return this.category.filter(x => x.categoryName.toLowerCase().includes(filterValue));
  }


  onSubmit(){
    const newGame: NewGame = {
      gameName: this.gameForm.get('gameName')?.value,
      gameDesc: this.gameForm.get('gameDesc')?.value,
      gameRating: this.gameForm.get('gameRating')?.value,
      userId: this.authSvc.userValue?.userId,
      categoryId: this.gameForm.get('categoryId')?.value
    }
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
