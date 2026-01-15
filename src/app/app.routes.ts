import { RegisterComponent } from './features/auth/register/register.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { CreateTransactionComponent } from './features/create-transaction/create-transaction.component';

export const routes: Routes = [
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
       path: '',
       component: CreateTransactionComponent,
       title: 'Transactions Page',
    },
     { 
         path: 'transactions', 
         component:  TransactionsComponent
     }
    // { 
    //     path: '/transactions/:transactionID', 
    //     component:  TransactionsComponent
    // }
];



