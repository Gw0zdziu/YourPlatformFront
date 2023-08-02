import {Component, OnInit} from '@angular/core';
import {CategoryList} from 'src/app/shared/models/http/category/CategoryList';
import {CategoryService} from 'src/app/shared/services/http/category/category.service';
import {GlobalService} from "../../../shared/services/global/global.service";
import {LoaderService} from "../../../shared/services/loader/loader.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  displayedColumns: string[] = ['categoryName', 'gameCount', 'actions'];
  categoriesList: CategoryList[]


  constructor(
    private categorySvc: CategoryService,
    private globalSvc: GlobalService,
    private loaderSvc: LoaderService,
  ) {
  }

  ngOnInit() {
    this.categorySvc.getCategoriesByUserId().subscribe({
      next: value => {
        this.categoriesList = value;
      }
    })
  }

  deactivateCategory(categoryId: string){
    this.categorySvc.deactivateCategory(categoryId).subscribe({
      next: () => {
        this.loaderSvc.show()
        this.globalSvc.refresh();
      },
      complete: () => {
        this.loaderSvc.hide()
      }
    })
  }
}
