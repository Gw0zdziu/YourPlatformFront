import {Component, OnInit} from '@angular/core';
import {CategoryList} from 'src/app/shared/models/http/category/CategoryList';
import {CategoryService} from 'src/app/shared/services/http/category/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  displayedColumns: string[] = ['categoryName', 'categoryDesc', 'status'];
  categoriesList: CategoryList[]

  constructor(
    private categorySvc: CategoryService
  ) {
  }

  ngOnInit() {
    this.categorySvc.getCategoriesByUserId().subscribe({
      next: value => {
        this.categoriesList = value;
      }
    })
  }
}
