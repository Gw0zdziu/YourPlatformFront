import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryComponent} from 'src/app/pages/category/category.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryListComponent } from './category-list/category-list.component';
import {CategoryRoutingModule} from 'src/app/pages/category/category-routing.module';
import {MaterialModule} from 'src/app/shared/modules/material/material.module';



@NgModule({
  declarations: [
    CategoryComponent,
    CategoryEditComponent,
    CategoryCreateComponent,
    CategoryDetailsComponent,
    CategoryListComponent
  ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        MaterialModule
    ]
})
export class CategoryModule { }
