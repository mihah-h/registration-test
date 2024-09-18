import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserDataHeaderComponent } from './user-data-header/user-data-header.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RegistrationUser } from '../../core/models/registrationUser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../core/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [
    UserDataHeaderComponent,
    DatePipe
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent implements OnInit {

  private _destroyRef = inject(DestroyRef);

  public userData!: RegistrationUser;

  constructor(
    private auth: AuthService,
    private user: UserService,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.user.getUserData().pipe(takeUntilDestroyed(this._destroyRef)).subscribe((user) => {
      if (user) {
        this.userData = user;
      }
    });
  }

  public onExit() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
