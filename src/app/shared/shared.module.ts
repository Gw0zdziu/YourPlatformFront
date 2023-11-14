import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    LoaderComponent,
    PaginationComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
  exports: [
    MaterialModule,
    PaginationComponent,
    LoaderComponent
  ],
})
export class SharedModule { }
