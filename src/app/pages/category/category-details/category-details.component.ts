import {Component, Inject, OnInit} from '@angular/core';
import {CategoryList} from "../../../shared/models/http/category/CategoryList";
import {CategoryService} from "../../../shared/services/http/category/category.service";
import {ActivatedRoute} from "@angular/router";
import {DialogRef} from "../../../shared/services/dialog/dialogRef";
import {DIALOG_DATA} from "../../../shared/services/dialog/dialog-tokens";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit{
  category: CategoryList;

  constructor(
    private categorySvc: CategoryService,
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: string
  ) {}

  ngOnInit() {
    this.categorySvc.getCategoryById(this.data).subscribe({
      next: value => {
        this.category = value
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

}
