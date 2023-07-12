import { Component } from '@angular/core';
import {LoaderService} from 'src/app/shared/services/loader/loader.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  isLoading: Subject<boolean> = this.loaderSvc.isLoading
  constructor(
    private loaderSvc: LoaderService
  ) {}



}
