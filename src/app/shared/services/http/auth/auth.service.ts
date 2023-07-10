import { Injectable } from '@angular/core';
import {SingUp} from 'src/app/shared/models/http/auth/SingUp';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment.development';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

  signUp(newUser: SingUp): Observable<void>{
    return this.http.post<void>(`${apiUrl}/auth/signup`, newUser)
  }
}
