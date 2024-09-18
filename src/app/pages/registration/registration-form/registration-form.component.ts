import { Component, Output, signal, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationUser } from '../../../core/models/authorizationUser';
import { ErrorStateMatcher, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { RegistrationUser } from '../../../core/models/registrationUser';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { GenderForSelect } from '../../../core/models/genderForSelect';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {

  public registrationForm!: FormGroup;

  @Output() registrationFormSent = new EventEmitter<RegistrationUser>();

  matcher = new ErrorStateMatcher();

  constructor(private router: Router) {}

  get passwordNotMatch() {
    return this.registrationForm.value.password !== this.registrationForm.value.passwordRepeat;
  }

  get emailControl() {
    return this.registrationForm.controls['email'] as FormControl
  }

  get passwordControl() {
    return this.registrationForm.controls['password'] as FormControl
  }

  get passwordRepeatControl() {
    return this.registrationForm.controls['passwordRepeat'] as FormControl
  }

  get nameControl() {
    return this.registrationForm.controls['name'] as FormControl
  }

  get surnameRepeatControl() {
    return this.registrationForm.controls['surname'] as FormControl
  }

  get phoneNumberControl() {
    return this.registrationForm.controls['phoneNumber'] as FormControl
  }

  get genderControl() {
    return this.registrationForm.controls['gender'] as FormControl
  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      passwordRepeat: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required]),
      birthDate: new FormControl(new Date()),
      gender: new FormControl('', Validators.required),
      city: new FormControl(''),
      information: new FormControl(''),
    });
  }

  onSubmitRegistrationForm() {
    const registrationUser: RegistrationUser = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      name: this.registrationForm.value.name,
      surname: this.registrationForm.value.surname,
      phoneNumber: this.registrationForm.value.phoneNumber,
      birthDate: this.registrationForm.value.birthDate,
      gender: this.registrationForm.value.gender,
      city: this.registrationForm.value.city,
      information: this.registrationForm.value.information,
    }
    this.registrationFormSent.emit(registrationUser)
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  goToAuthPage() {
    this.registrationForm.reset()
    this.router.navigate(['/'])
  }
}
