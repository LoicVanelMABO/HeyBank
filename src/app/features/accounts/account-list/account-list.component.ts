import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountService } from '../account.service';
import { Account } from '../account.model';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css',
})
export class AccountListComponent implements OnInit {

  accounts: Account[] = [];
  selectedAccount?: Account;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
  this.loadAccounts();
}

loadAccounts(): void {
  this.accountService.getAccounts().subscribe(accounts => {
    this.accounts = accounts;
    this.selectedAccount = undefined;
  });
}

  onAccountChange(accountId: string): void {
    this.selectedAccount = this.accounts.find(acc => acc.id === accountId);
  }
}
