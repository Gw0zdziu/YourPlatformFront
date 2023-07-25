import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment.development';
import {Observable} from 'rxjs';
import {CategoryList} from 'src/app/shared/models/http/category/CategoryList';
import {HttpClient} from '@angular/common/http';
import {NewCategory} from 'src/app/shared/models/http/category/NewCategory';
import {UpdateCategory} from 'src/app/shared/models/http/category/UpdateCategory';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) {}

  getCategoryById(categoryId: string): Observable<CategoryList>{
    return this.http.get<CategoryList>(`${apiUrl}/category/${categoryId}`)
  }

  getCategoriesByUserId(): Observable<CategoryList[]>{
    return this.http.get<CategoryList[]>(`${apiUrl}/category/by/user`)
  }

  deactivateCategory(categoryId: string): Observable<void>{
    return this.http.put<void>(`${apiUrl}/category/${categoryId}`, null)
  }

  createNewCategory(newCategory: NewCategory): Observable<void>{
    return this.http.post<void>(`${apiUrl}/category/add`, newCategory)
  }

  updateCategory(categoryId: string, updatedCategory:UpdateCategory): Observable<void>{
    return this.http.put<void>(`${apiUrl}/category/update/${categoryId}`, updatedCategory)
  }
}
