import { Component, OnInit } from '@angular/core';
import { RegistrationFormComponent } from '../registration/registration-form/registration-form.component';
import { UserDataHeaderComponent } from './user-data-header/user-data-header.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RegistrationUser } from '../../core/models/registrationUser';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [
    RegistrationFormComponent,
    UserDataHeaderComponent
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent implements OnInit{
  user!: RegistrationUser;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.auth.currentUser) {
      this.user = JSON.parse(this.auth.currentUser);
    }
  }

  public onExit() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
