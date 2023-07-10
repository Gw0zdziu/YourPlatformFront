import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from 'src/app/pages/category/category.component';
import {CategoryListComponent} from 'src/app/pages/category/category-list/category-list.component';
import {CategoryDetailsComponent} from 'src/app/pages/category/category-details/category-details.component';
import {CategoryEditComponent} from 'src/app/pages/category/category-edit/category-edit.component';
import {CategoryCreateComponent} from 'src/app/pages/category/category-create/category-create.component';

const ROUTES: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children: [
      {
        path: 'list',
        component: CategoryListComponent,
      },
      {
        path: 'details',
        component: CategoryDetailsComponent
      },
      {
        path: 'edit',
        component: CategoryEditComponent
      },
      {
        path: 'create',
        component: CategoryCreateComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class CategoryRoutingModule { }
