import { Injectable } from '@angular/core';
import { AuthorizationUser } from '../models/authorizationUser';
import { RegistrationUser } from '../models/registrationUser';
import { Observable, of, switchMap } from 'rxjs';
import { BackendImitationService } from './backend-imitation.service';

@Injectable({
  providedIn: 'any'
})
export class AuthService {

  constructor(private backendImitation: BackendImitationService) {}

  get currentUser(): string | null {
    return localStorage.getItem('currentUser')
  }

  login(authUser: AuthorizationUser): Observable<RegistrationUser | null> {
    return this.backendImitation.authUser(authUser).pipe(
      switchMap((user) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return of(user);
      })
    );
  }

  register(user: RegistrationUser): Observable<boolean> {
    return this.backendImitation.registerUser(user);
  }

  logout() {
    this.setUser(null)
  }

  isAuthenticated(): boolean {
    return !!this.currentUser
  }

  private setUser(response: RegistrationUser | null) {
    if (response) {
      localStorage.setItem('currentUser', response.email)
    } else {
      localStorage.removeItem('currentUser');
    }
  }
}
