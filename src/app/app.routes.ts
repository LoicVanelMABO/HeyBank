import { RegisterComponent } from './features/auth/register/register.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { TransactionsComponent } from './features/transactions/transactions.component';
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
