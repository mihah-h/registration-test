import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../theme/components/card/card.component';
import { MatFormField } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthorizationFormComponent } from './authorization-form/authorization-form.component';
import { AuthorizationUser } from '../../core/models/authorizationUser';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RegistrationUser } from '../../core/models/registrationUser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [
    CardComponent,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatIconButton,
    MatIcon,
    MatButton,
    AuthorizationFormComponent,
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent {

  private _destroyRef = inject(DestroyRef);

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}
  authorizeUser(user: AuthorizationUser) {
    this.auth.login(user).pipe(takeUntilDestroyed(this._destroyRef)).subscribe((user) => {
      if (user) {
        this.router.navigate(['/user-data'])
      }
      else {
        alert('Такого пользователя не существует')
      }
    })
  }
}
