import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { CreateTransactionComponent } from './features/create-transaction/create-transaction.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'HeyBank - La banque simplifiée'
    },
    {
        canActivate: [authGuard],
        title: 'Dashboard',
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        canActivate: [authGuard],
        title: 'Mes comptes',
        path: 'accounts',
        loadComponent: () =>
            import('./features/accounts/account-list/account-list.component')
                .then(m => m.AccountListComponent)
    },
    {
        canActivate: [authGuard],
        title: 'Créer un compte',
        path: 'accounts/create',
        loadComponent: () =>
            import('./features/accounts/account-create/account-create.component')
                .then(m => m.AccountCreateComponent)
    },
    {
        canActivate: [authGuard],
        title: 'Détails du compte',
        path: 'accounts/:id',
        loadComponent: () =>
            import('./features/accounts/account-details/account-details.component')
                .then(m => m.AccountDetailsComponent)
    },
    {
        canActivate: [authGuard],
        title: 'Créer une transaction',
        path: 'transactions/create',
        component: CreateTransactionComponent
    },
    {
        canActivate: [authGuard],
        title: 'Transactions',
        path: 'transactions',
        component: TransactionsComponent
    },
    {
        canActivate: [authGuard],
        title: 'Profile',
        path: 'profile',
        component: ProfileComponent
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
    }
];
