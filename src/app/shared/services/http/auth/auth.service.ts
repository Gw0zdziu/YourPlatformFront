import { Injectable } from '@angular/core';
import {SingUp} from 'src/app/shared/models/http/auth/SingUp';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment.development';
import {SignIn} from 'src/app/shared/models/http/auth/SignIn';
import {User} from 'src/app/shared/models/user/User';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  constructor(
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  signUp(newUser: SingUp): Observable<void>{
    return this.http.post<void>(`${apiUrl}/auth/signup`, newUser)
  }

  signIn(credentials: SignIn): Observable<User>{
    return this.http.post<User>(`${apiUrl}/auth/signin`, credentials)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user))
        this.userSubject.next(user);
        return user;
      }))
  }

  logout(): void{
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }


}
