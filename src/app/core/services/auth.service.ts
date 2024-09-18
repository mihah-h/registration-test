import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthorizationUser } from '../models/authorizationUser';
import { RegistrationUser } from '../models/registrationUser';
import { BackendImitationService } from './backend-imitation.service';

@Injectable({
  providedIn: 'any'
})
export class AuthService {

  constructor(private backendImitation: BackendImitationService) {}

  get currentUser(): string | null {
    return localStorage.getItem('currentUser');
  }

  public login(authUser: AuthorizationUser): Observable<RegistrationUser | null> {
    return this.backendImitation.authUser(authUser).pipe(
      tap(this.setUser)
    );
  }

  public register(user: RegistrationUser): Observable<RegistrationUser> {
    return this.backendImitation.registerUser(user);
  }

  public logout() {
    this.setUser(null);
  }

  public isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  private setUser(response: RegistrationUser | null) {
    if (response) {
      localStorage.setItem('currentUser', response.email);
    } else {
      localStorage.removeItem('currentUser');
    }
  }
}
