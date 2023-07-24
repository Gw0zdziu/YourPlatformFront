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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(err.status)
      if ([401, 403].includes(err.status) && this.authSvc.userValue){
        this.authSvc.logout().subscribe({
          next: () => {
            localStorage.removeItem('user');
            this.authSvc.userValue = null;
            this.router.navigateByUrl('/auth/login')
          }
        })
      }
      const error = err.error?.message || err.statusText;
      console.error(err)
      return throwError(() => error)
    }))
  }
}
