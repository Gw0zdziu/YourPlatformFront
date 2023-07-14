import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment.development';
import {Observable} from 'rxjs';
import {CategoryList} from 'src/app/shared/models/http/category/CategoryList';
import {HttpClient} from '@angular/common/http';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) {}

    getCategoriesByUserId(): Observable<CategoryList[]>{
    return this.http.get<CategoryList[]>(`${apiUrl}/category/by/user`)
  }
}
