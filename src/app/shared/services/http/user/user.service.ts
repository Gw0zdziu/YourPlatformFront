import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UpdateUsername} from "../../../models/user/UpdateUsername";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment.development";
import {UpdatePassword} from "../../../models/user/UpdatePassword";

const apiUrl = environment.apiUrl


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  updateUsername(updateUsername: UpdateUsername): Observable<void>{
    return this.http.put<void>(`${apiUrl}/user/update-username`, updateUsername )
  }

  updatePassword(updatePassword: UpdatePassword): Observable<void>{
    return this.http.put<void>(`${apiUrl}/user/update-password`, updatePassword )
  }
}
