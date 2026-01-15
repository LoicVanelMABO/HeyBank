import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../core/services/accounts/account.service';

@Component({
  selector: 'app-account-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './account-create.component.html',
  styleUrl: './account-create.component.css'
})
export class AccountCreateComponent {

  label = '';
  initialBalance = 0;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  submit(): void {
    console.log('SUBMIT CALLED'); 

    this.accountService.createAccount({
      label: this.label,
      initialBalance: this.initialBalance
    }).subscribe(() => {
      console.log('ACCOUNT CREATED');
      this.router.navigate(['/accounts']);
    });
  }
}
