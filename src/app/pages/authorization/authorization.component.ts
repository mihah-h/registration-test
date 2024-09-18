import { Component, DestroyRef, inject } from '@angular/core';
import { AuthorizationFormComponent } from './authorization-form/authorization-form.component';
import { AuthorizationUser } from '../../core/models/authorizationUser';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [AuthorizationFormComponent],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent {

  private _destroyRef = inject(DestroyRef);

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}
  public authorizeUser(user: AuthorizationUser) {
    this.auth.login(user).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((user) => {
      if (user) {
        this.router.navigate(['/user-data']);
      }
      else {
        alert('Такого пользователя не существует');
      }
    })
  }
}
