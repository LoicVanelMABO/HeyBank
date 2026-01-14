import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accounts',
    pathMatch: 'full'
  },
  {
    title: 'Login',
    path: 'login',
    component: LoginComponent
  },
  {
    title: 'Register',
    path: 'register',
    component: RegisterComponent
  },
  {
    title: 'Mes comptes',
    path: 'accounts',
    loadComponent: () =>
      import('./features/accounts/account-list/account-list.component')
        .then(m => m.AccountListComponent)
  },
  {
  title: 'Créer un compte',
  path: 'accounts/create',
  loadComponent: () =>
    import('./features/accounts/account-create/account-create.component')
      .then(m => m.AccountCreateComponent)
    },
    {
  title: 'Détails du compte',
  path: 'accounts/:id',
  loadComponent: () =>
    import('./features/accounts/account-details/account-details.component')
      .then(m => m.AccountDetailsComponent)
}

];
