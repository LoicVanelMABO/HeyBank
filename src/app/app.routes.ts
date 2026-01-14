import { RegisterComponent } from './features/auth/register/register.component';
import { Routes } from '@angular/router';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        title: 'Dashboard',
        path: 'dashboard',
        component: DashboardComponent
    },
    {
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
