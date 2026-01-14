import { Component } from '@angular/core';
import { NgClass,CommonModule, DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [NgClass,DatePipe,CurrencyPipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})

export class TransactionsComponent {
  transactions = [
    {
      date: '2026-01-10',
      description: 'Paiement carte - Amazon',
      type: 'DEBIT',
      amount: 59.99,
      balance: 1240.50
    },
    {
      date: '2026-01-09',
      description: 'Salaire',
      type: 'CREDIT',
      amount: 2500,
      balance: 1300.49
    }
  ];

}
