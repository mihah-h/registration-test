import { Component, DestroyRef, inject } from '@angular/core';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { RegistrationUser } from '../../core/models/registrationUser';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RegistrationFormComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  private _destroyRef = inject(DestroyRef);

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  public registerUser(user: RegistrationUser) {
    this.auth.register(user).pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
