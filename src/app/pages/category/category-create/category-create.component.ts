import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewCategory} from 'src/app/shared/models/http/category/NewCategory';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {CategoryService} from 'src/app/shared/services/http/category/category.service';
import {first} from 'rxjs';
import {Router} from '@angular/router';
import {NotificationService} from 'src/app/shared/services/snackbar/notification.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  categoryForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private categorySvc :CategoryService,
    private router: Router,
    private notificationSvc: NotificationService
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryDesc: ['', Validators.required],
    })
  }

  onSubmit(){
    const newCategory: NewCategory = {
      categoryName: this.categoryForm.get('categoryName')?.value,
      categoryDesc: this.categoryForm.get('categoryDesc')?.value,
      userId: this.authSvc.userValue?.userId
    }
    this.categorySvc.createNewCategory(newCategory).subscribe({
      next: () => {
        this.notificationSvc.openNotification('Pomyślnie utworzono kategorie')
        this.router.navigate(['/category/list'])
      },
      error: err => {
        this.notificationSvc.openNotification(err)
      }
    })
  }
}
