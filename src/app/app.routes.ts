import { RegisterComponent } from './features/auth/register/register.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        canActivate:[authGuard],
        title: 'Dashboard',
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        canActivate:[authGuard],
        title: 'Transactions',
        path: 'transactions',
        component: TransactionsComponent
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
