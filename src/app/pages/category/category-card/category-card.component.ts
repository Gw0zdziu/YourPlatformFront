import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryList} from "../../../shared/models/http/category/CategoryList";

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  @Input() category: CategoryList
  @Output() categoryIdToDeactivate = new EventEmitter<string>();
  @Output() categoryIdToSee = new EventEmitter<string>();

  deactivateCategory(categoryId: string): void{
    this.categoryIdToDeactivate.emit(categoryId)
  }

  openDetails(categoryId: string): void{
    this.categoryIdToSee.emit(categoryId)
  }

}
