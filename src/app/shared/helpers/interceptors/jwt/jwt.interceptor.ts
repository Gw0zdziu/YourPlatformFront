import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from 'src/app/shared/services/http/auth/auth.service';
import {environment} from 'src/environments/environment.development';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authSvc: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authSvc.userValue;
    const isLoggedIn = user && user.accessToken;
    const apiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && apiUrl){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.accessToken}`,
          'userId': user.userId,
        }
      })
    }
    return next.handle(request);
  }
}
