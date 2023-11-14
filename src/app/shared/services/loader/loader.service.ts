import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSubject: BehaviorSubject<boolean>
  private readonly isLoading$: Observable<boolean>
  constructor() {
    this.isLoadingSubject = new BehaviorSubject<boolean>(true);
    this.isLoading$ = this.isLoadingSubject.asObservable();
}


  show(){
    this.isLoadingSubject.next(true)
  }

  hide(){
    this.isLoadingSubject.next(false)
  }

  get loader(): Observable<boolean>{
    return this.isLoading$;
  }
}
