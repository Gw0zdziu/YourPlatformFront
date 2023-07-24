import {Component, OnInit} from '@angular/core';
import {CategoryList} from 'src/app/shared/models/http/category/CategoryList';
import {CategoryService} from 'src/app/shared/services/http/category/category.service';
import {Observable, Subject} from "rxjs";
import {GlobalService} from "../../../shared/services/global/global.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  displayedColumns: string[] = ['categoryName', 'categoryDesc', 'status', 'gameCount', 'actions'];
  categoriesList: CategoryList[]


  constructor(
    private categorySvc: CategoryService,
    private globalSvc: GlobalService
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
        this.globalSvc.refresh();
      }
    })
  }
}
