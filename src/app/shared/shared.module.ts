import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from 'src/app/shared/modules/material/material.module';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    LoaderComponent
  ]
})
export class SharedModule { }
