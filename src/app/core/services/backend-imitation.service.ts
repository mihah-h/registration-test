import { delay, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { RegistrationUser } from '../models/registrationUser';
import { AuthorizationUser } from '../models/authorizationUser';

@Injectable({
  providedIn: 'any'
})
export class BackendImitationService {

  constructor() { }

  public registerUser(user: RegistrationUser): Observable<boolean> {
    localStorage.setItem(user.email, JSON.stringify(user));
    return of(true).pipe(delay(1000));
  }

  public authUser(user: AuthorizationUser): Observable<RegistrationUser | null> {
    return of(null).pipe(delay(1000), map(() => {
      const storedUser = JSON.parse(localStorage.getItem(user.email) || '{}') as RegistrationUser;

      if (storedUser && storedUser.password === user.password) {
        return storedUser;
      } else {
        return null;
      }
    }));
  }
}
