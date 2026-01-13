import { Routes } from '@angular/router';
import { TransactionsComponent } from './features/transactions/transactions.component';

export const routes: Routes = [{
      path: '',
    component: TransactionsComponent,
    title: 'Transactions Page',
}];
