import { delay, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { RegistrationUser } from '../models/registrationUser';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'any'
})
export class UserService {

  constructor(private auth: AuthService) {}

  public getUserData(): Observable<RegistrationUser | null> {
    if (this.auth.currentUser) {
      return of(JSON.parse(localStorage.getItem(this.auth.currentUser) || '{}')).pipe(delay(1000));
    }
    return of(null).pipe(delay(1000));
  }
}
