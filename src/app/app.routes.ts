import { RegisterComponent } from './features/auth/register/register.component';
import { Routes } from '@angular/router';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [{
      path: '',
    component: TransactionsComponent,
    title: 'Transactions Page',
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
