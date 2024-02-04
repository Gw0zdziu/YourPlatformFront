import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {CategoryService} from 'src/app/shared/services/http/category/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from 'src/app/shared/services/snackbar/notification.service';
import {UpdateCategory} from 'src/app/shared/models/http/category/UpdateCategory';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit{
  categoryForm: FormGroup;
  categoryId: string | null;
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private categorySvc :CategoryService,
    private router: Router,
    private notificationSvc: NotificationService,
    private route: ActivatedRoute
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryDesc: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.categorySvc.getCategoryById(this.categoryId).subscribe({
      next: value => {
        this.categoryForm.get('categoryName')?.patchValue(value.categoryName);
        this.categoryForm.get('categoryDesc')?.patchValue(value.categoryDesc);
      },
      error: err => {
        this.notificationSvc.openNotification(err);
      }
    })
  }
  onSubmit(){
    const updatedCategory: UpdateCategory = {
      categoryName: this.categoryForm.get('categoryName')?.value,
      categoryDesc: this.categoryForm.get('categoryDesc')?.value,
    }
    this.categorySvc.updateCategory(this.categoryId, updatedCategory).subscribe({
      next: () => {
        this.notificationSvc.openNotification('Pomyślnie zaktualizowano kategorie')
        this.router.navigate(['/category/list'])
      },
      error: err => {
        this.notificationSvc.openNotification(err)
      }
    })
  }
}
