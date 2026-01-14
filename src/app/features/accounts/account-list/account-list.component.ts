import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Account } from '../../../core/models/account/Account';
import { AccountService } from '../../../core/services/accounts/account.service';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {

  accounts: Account[] = [];
  isLoading = true;
  totalBalance = 0;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      this.calculateTotalBalance();
      this.isLoading = false;
    });
  }

  calculateTotalBalance(): void {
    this.totalBalance = this.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }

  getAccountInitial(label: string): string {
    return label ? label.charAt(0).toUpperCase() : '?';
  }
}
