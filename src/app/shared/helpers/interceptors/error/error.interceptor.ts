import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from 'src/app/shared/services/snackbar/notification.service';
import {DialogService} from "../../../services/dialog/dialog.service";
import {DialogRef} from "../../../services/dialog/dialogRef";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private notificationSvc: NotificationService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.authSvc.userValue){
        this.authSvc.logout().subscribe({
          next: () => {
            localStorage.removeItem('user');
            this.authSvc.userValue = null;
            this.router.navigateByUrl('/auth/login');
            this.notificationSvc.openNotification('Sesja użytkownika wygasła');
          }
        })
      }
      const error = err.error?.message || err.statusText;
      return throwError(() => error)
    }))
  }
}
