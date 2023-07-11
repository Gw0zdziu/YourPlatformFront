import { Injectable } from '@angular/core';
import {SingUp} from 'src/app/shared/models/http/auth/SingUp';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment.development';
import {SignIn} from 'src/app/shared/models/http/auth/SignIn';
import {AccessToken} from 'src/app/shared/models/http/auth/AccessToken';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: BehaviorSubject<AccessToken | null>
  public user: Observable<AccessToken | null>

  constructor(
    private http: HttpClient
  ) {}

  signUp(newUser: SingUp): Observable<void>{
    return this.http.post<void>(`${apiUrl}/auth/signup`, newUser)
  }

  signIn(credentials: SignIn): Observable<void>{
    return this.http.post<AccessToken>(`${apiUrl}/auth/signin`, credentials)
      .pipe(map(accessToken => {
        localStorage.setItem('user', JSON.stringify(accessToken))
        this.accessToken.next(accessToken);
      }))
  }
}
