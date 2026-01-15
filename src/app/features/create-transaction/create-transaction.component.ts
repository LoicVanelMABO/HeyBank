import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../core/services/transaction/transaction.service';
import { TransactionRequest } from '../../core/models/transaction/TransactionRequest';
import { Account } from '../../core/models/account/Account';
import { AccountService } from '../../core/services/accounts/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css'
})

export class CreateTransactionComponent {
  _account ! : Account;
  loading = false;
  success = false;
  errorMessage = '';
  formTransaction!: FormGroup;
  
  constructor(private fb: FormBuilder, private transactionService: TransactionService, private accountService: AccountService, private router: Router){
    this.formTransaction = this.fb.group({
      receiverAccountId: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });
  }

    ngOnInit():void{  
    this.accountService.getOneAccount("fc1d0929-f3d6-4779-84fc-cd0f8a89c638").subscribe({
      next:compte =>this._account = compte
    });
  }


  submit(): void {
    if (this.formTransaction.invalid) {
      this.formTransaction.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.success = false;
    this.errorMessage = '';

    const trequest: TransactionRequest = {
      emitterAccountId : 'fc1d0929-f3d6-4779-84fc-cd0f8a89c638' ,
      receiverAccountId : this.formTransaction.value.receiverAccountId.toString(),
      amount : this.formTransaction.value.amount,
      description : this.formTransaction.value.description
    }
    //this.form.value as TransactionRequest;

    this.transactionService.createTransaction(trequest).subscribe({
      next: (createdTransaction) => {
        this.success = true;
        this.formTransaction.reset();
        this.router
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création de la transaction';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

}
