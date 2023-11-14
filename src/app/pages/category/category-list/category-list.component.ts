import {Component, OnInit} from '@angular/core';
import {CategoryList} from 'src/app/shared/models/http/category/CategoryList';
import {CategoryService} from 'src/app/shared/services/http/category/category.service';
import {GlobalService} from "../../../shared/services/global/global.service";
import {LoaderService} from "../../../shared/services/loader/loader.service";
import {DialogService} from "../../../shared/services/dialog/dialog.service";
import {CategoryDetailsComponent} from "../category-details/category-details.component";
import {map} from "rxjs";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{



  constructor(
    private categorySvc: CategoryService,
    private globalSvc: GlobalService,
    private loaderSvc: LoaderService,
    private dialogSvc: DialogService
  ) {
  }

  categoriesList$ = this.categorySvc.categoriesList$

  ngOnInit() {
  }

  openDetails(categoryId: string) {
    const dialogRef = this.dialogSvc.open(CategoryDetailsComponent, { data: categoryId });

    dialogRef.afterClosed().subscribe(() => {
    });
  }


  deactivateCategory(categoryId: string){
    this.categorySvc.deactivateCategory(categoryId).subscribe({
      next: () => {
        this.categoriesList$ = this.categoriesList$.pipe(
          map(categories => {
            return categories.filter(category => category.categoryId !== categoryId)
          })
        )
      },
      complete: () => {
      }
    })
  }
}
