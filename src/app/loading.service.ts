import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);  // Default to not loading
  loading$ = this.loadingSubject.asObservable();

  loadingOn() {
    this.loadingSubject.next(true);  // Start loading
  }

  loadingOff() {
    this.loadingSubject.next(false);  // Stop loading
  }
}
