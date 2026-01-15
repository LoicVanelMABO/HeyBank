import { Component } from '@angular/core';
import { NgClass,CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { TransactionRequest } from '../../core/models/transaction/TransactionRequest';
import { Transaction } from '../../core/models/transaction/Transaction';
import { TransactionService } from '../../core/services/transaction/transaction.service';
import { AccountService } from '../../core/services/accounts/account.service';
import { User } from '../../core/models/auth/User';
import { AuthService } from '../../core/services/auth/auth.service';
import { Account } from '../../core/models/account/Account';
import { RouterLink } from "@angular/router";
import { TransactionsByDate } from '../../core/models/transaction/TransactionsByDate';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [NgClass, DatePipe, CurrencyPipe, CommonModule, RouterLink,FormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})

export class TransactionsComponent {

  allTransaction = false;
  transactions: Transaction[] =[];
  _transactions: Transaction[] =[];
  loading = false;
  currentUser!: User;
  _authService! : AuthService;
  _account! : Account;
  MAX_VISIBLE = 5;
  filterText: string = '';  // texte pour filtrer les transactions
  filterStatus: string = 'all'; // exemple: 'all', 'completed', 'pending', etc.

  constructor(private serviceTransaction : TransactionService, private serviceAccount: AccountService, authService: AuthService){
    this._authService = authService;
  }
  

  ngOnInit():void{  
    this.loading=true;
    this._authService.getCurrentUser().subscribe({
      next: user => this.currentUser = user
    });

    this.serviceAccount.getAllTransactionsAccount("fc1d0929-f3d6-4779-84fc-cd0f8a89c638").subscribe({
      next:data =>this.transactions = data,
      complete: () => this.loading = false
    });
    
    this.serviceAccount.getOneAccount("fc1d0929-f3d6-4779-84fc-cd0f8a89c638").subscribe({
      next:compte =>this._account = compte
    });
  }

  get filteredTransactions(): Transaction[] {
    return this.transactions.filter(t => {
      // Filtre par description ou nom de l'autre partie
      const nameMatch = t.emitter.owner.name.toLowerCase().includes(this.filterText.toLowerCase())
        || t.receiver.owner.name.toLowerCase().includes(this.filterText.toLowerCase())
        || t.description.toLowerCase().includes(this.filterText.toLowerCase());

      // Filtre par statut si demandé
      const statusMatch = this.filterStatus === 'all' || t.status === this.filterStatus;

      return nameMatch && statusMatch;
    });
  }

  get displayedTransactions(): Transaction[] {
    return this.allTransaction
      ? this.filteredTransactions
      : this.filteredTransactions.slice(0, this.MAX_VISIBLE);
  }

  allTrans(){
    this.allTransaction = true;
  }
  lessTrans() {
    this.allTransaction = false;
  }

}
