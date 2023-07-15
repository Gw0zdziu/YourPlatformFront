import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private matSnackBar: MatSnackBar
  ) { }

  openNotification(message: string){
    this.matSnackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: "top",
    })
  }
}
