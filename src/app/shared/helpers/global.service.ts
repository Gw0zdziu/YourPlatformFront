import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  refreshComponent(path: string){
    this.router.navigateByUrl(path, {skipLocationChange: true}).then(() =>{
      this.router.navigate([this.location.path()])
    })
  }
}
