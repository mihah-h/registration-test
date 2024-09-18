import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth-guard.guard';

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
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/user-data/user-data.component').then((x) => x.UserDataComponent),
  },
];
