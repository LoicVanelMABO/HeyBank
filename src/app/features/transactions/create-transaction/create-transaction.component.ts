import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction/transaction.service';
import { TransactionRequest } from '../../../core/models/transaction/TransactionRequest';
import { Account } from '../../../core/models/account/Account';
import { AccountService } from '../../../core/services/accounts/account.service';
import { Router } from '@angular/router';
import { Transaction } from '../../../core/models/transaction/Transaction';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe, DatePipe],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css'
})
export class CreateTransactionComponent implements OnInit {
  // État de l'interface
  viewMode: 'form' | 'details' = 'form';
  loading = false;
  errorMessage = '';
  cancelErrorMessage = '';
  cancelSuccessMessage = '';
  cancelingTransaction = false;

  // Données
  account: Account | null = null;
  createdTransaction: Transaction | null = null;
  formTransaction: FormGroup;

  // ID du compte émetteur
  private accountId = '';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private router: Router
  ) {
    // Initialiser le formulaire
    this.formTransaction = this.fb.group({
      receiverAccountId: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required]
    });

    // Récupérer accountId depuis le state de navigation
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.accountId = navigation.extras.state['accountId'];
    }
  }

  ngOnInit(): void {
    // Fallback : récupérer depuis l'historique si non trouvé dans le constructeur
    if (!this.accountId) {
      const state = history.state;
      this.accountId = state?.accountId || '';
    }

    if (!this.accountId) {
      this.errorMessage = 'Aucun compte sélectionné. Veuillez revenir à la liste des comptes.';
      return;
    }

    // Charger les informations du compte
    this.accountService.getOneAccount(this.accountId).subscribe({
      next: (account) => {
        this.account = account;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du compte:', error);
        this.errorMessage = 'Impossible de charger les informations du compte.';
      }
    });
  }

  submit(): void {
    if (this.formTransaction.invalid) {
      this.formTransaction.markAllAsTouched();
      return;
    }

    if (!this.accountId) {
      this.errorMessage = 'Aucun compte émetteur sélectionné.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const transactionRequest: TransactionRequest = {
      emitterAccountId: this.accountId,
      receiverAccountId: this.formTransaction.value.receiverAccountId.trim(),
      amount: this.formTransaction.value.amount,
      description: this.formTransaction.value.description.trim()
    };

    this.transactionService.createTransaction(transactionRequest).subscribe({
      next: (transaction) => {
        this.createdTransaction = transaction;
        this.viewMode = 'details';
        this.formTransaction.reset();
      },
      error: (error) => {
        console.error('Erreur lors de la création de la transaction:', error);
        this.errorMessage = error.error?.message || 'Erreur lors de la création de la transaction. Vérifiez les informations saisies.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  cancelTransaction(): void {
    if (!this.createdTransaction) {
      return;
    }

    if (this.createdTransaction.status === 'completed') {
      this.cancelErrorMessage = 'Cette transaction est déjà confirmée et ne peut plus être annulée.';
      return;
    }

    this.cancelingTransaction = true;
    this.cancelErrorMessage = '';
    this.cancelSuccessMessage = '';

    this.transactionService.cancelTransaction(this.createdTransaction.id).subscribe({
      next: (updatedTransaction) => {
        this.createdTransaction = updatedTransaction;
        this.cancelSuccessMessage = 'Transaction annulée avec succès !';
      },
      error: (error) => {
        console.error('Erreur lors de l\'annulation:', error);
        
        // Gérer le cas où la transaction est déjà confirmée
        if (error.status === 400 || error.error?.message?.includes('completed')) {
          this.cancelErrorMessage = 'Cette transaction a déjà été confirmée et ne peut plus être annulée.';
        } else {
          this.cancelErrorMessage = error.error?.message || 'Impossible d\'annuler la transaction. Veuillez réessayer.';
        }
        
        this.cancelingTransaction = false;
      },
      complete: () => {
        this.cancelingTransaction = false;
      }
    });
  }

  createNewTransaction(): void {
    this.viewMode = 'form';
    this.createdTransaction = null;
    this.errorMessage = '';
    this.cancelErrorMessage = '';
    this.cancelSuccessMessage = '';
  }

  canCancelTransaction(): boolean {
    return this.createdTransaction?.status !== 'completed' && this.createdTransaction?.status !== 'cancelled';
  }
}
