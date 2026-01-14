import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Account } from '../account.model';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {

  account?: Account;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id');

    if (accountId) {
      this.accountService.getAccountById(accountId)
        .subscribe(account => {
          this.account = account;
        });
    }
  }
}
