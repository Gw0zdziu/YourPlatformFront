import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private router: Router
  ) { }

  refresh(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/',{skipLocationChange: true}).then(() =>{
      this.router.navigate([currentUrl]);
    })
  }
}
