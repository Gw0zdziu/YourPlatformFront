import {Component, OnInit} from '@angular/core';
import {CategoryList} from "../../../shared/models/http/category/CategoryList";
import {CategoryService} from "../../../shared/services/http/category/category.service";
import {GlobalService} from "../../../shared/services/global/global.service";
import {LoaderService} from "../../../shared/services/loader/loader.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit{
  categoryId: string | null;
  category: CategoryList;

  constructor(
    private categorySvc: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.categorySvc.getCategoryById(this.categoryId).subscribe({
      next: value => {
        this.category = value
      }
    })
  }
}
