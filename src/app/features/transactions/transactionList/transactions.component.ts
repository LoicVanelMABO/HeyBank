import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Transaction } from '../../../core/models/transaction/Transaction';
import { TransactionService } from '../../../core/services/transaction/transaction.service';
import { AccountService } from '../../../core/services/accounts/account.service';
import { User } from '../../../core/models/auth/User';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Account } from '../../../core/models/account/Account';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, CommonModule, FormsModule, RouterLink],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  // État de l'affichage
  allTransaction = false;
  loading = false;
  readonly MAX_VISIBLE = 5;

  // Données
  transactions: Transaction[] = [];
  currentUser: User | null = null;
  account: Account | null = null;

  // Filtres
  filterText = '';
  filterStatus = 'all';

  // ID du compte
  accountId = '';

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router
  ) {
    // Récupérer accountId depuis le state de navigation
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.accountId = navigation.extras.state['accountId'];
    }
  }

  ngOnInit(): void {
    this.loading = true;

    // Fallback : récupérer depuis l'historique si non trouvé dans le constructeur
    if (!this.accountId) {
      const state = history.state;
      this.accountId = state?.accountId || '';
    }

    if (!this.accountId) {
      console.warn('Aucun accountId fourni');
      this.loading = false;
      return;
    }

    // Charger l'utilisateur actuel
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
      }
    });

    // Charger les transactions
    this.accountService.getAllTransactionsAccount(this.accountId).subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des transactions:', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });

    // Charger le compte
    this.accountService.getOneAccount(this.accountId).subscribe({
      next: (compte) => {
        this.account = compte;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du compte:', error);
      }
    });
  }

  get filteredTransactions(): Transaction[] {
    return this.transactions.filter(t => {
      // Filtre par description ou nom de l'autre partie
      const nameMatch = t.emitter.owner.name.toLowerCase().includes(this.filterText.toLowerCase())
        || t.receiver.owner.name.toLowerCase().includes(this.filterText.toLowerCase())
        || t.description.toLowerCase().includes(this.filterText.toLowerCase());

      // Filtre par statut
      const statusMatch = this.filterStatus === 'all' || t.status === this.filterStatus;

      return nameMatch && statusMatch;
    });
  }

  get displayedTransactions(): Transaction[] {
    return this.allTransaction
      ? this.filteredTransactions
      : this.filteredTransactions.slice(0, this.MAX_VISIBLE);
  }

  allTrans(): void {
    this.allTransaction = true;
  }

  lessTrans(): void {
    this.allTransaction = false;
  }
}
