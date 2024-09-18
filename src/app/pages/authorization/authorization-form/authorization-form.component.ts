import { ChangeDetectionStrategy, Component, OnInit, Output, signal, EventEmitter } from '@angular/core';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import { AuthorizationUser } from '../../../core/models/authorizationUser';

@Component({
  selector: 'app-authorization-form',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatHint,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatAnchor,
    RouterLink
  ],
  templateUrl: './authorization-form.component.html',
  styleUrl: './authorization-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationFormComponent implements OnInit {
  public authorizationForm!: FormGroup;

  @Output() public authorizationFormSent = new EventEmitter<AuthorizationUser>();

  public matcher = new ErrorStateMatcher();

  constructor(private router: Router) {}

  get emailControl() {
    return this.authorizationForm.controls['email'] as FormControl
  }

  get passwordControl() {
    return this.authorizationForm.controls['password'] as FormControl
  }

  public ngOnInit() {
    this.authorizationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmitAuthorizationForm() {
    const authorizationUser: AuthorizationUser = {
      email: this.authorizationForm.value.email,
      password: this.authorizationForm.value.password,
    }
    this.authorizationFormSent.emit(authorizationUser)
  }

  hide = signal(true);
  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public goToRegisterPage() {
    this.authorizationForm.reset()
    this.router.navigate(['/registration'])
  }
}
