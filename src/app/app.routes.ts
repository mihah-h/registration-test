import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/authorization/authorization.component').then((x) => x.AuthorizationComponent),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./pages/registration/registration.component').then((x) => x.RegistrationComponent),
  },
  {
    path: 'user-data',
    loadComponent: () =>
      import('./pages/user-data/user-data.component').then((x) => x.UserDataComponent),
  },
];
