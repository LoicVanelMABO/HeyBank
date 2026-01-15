import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Account } from '../../../core/models/account/Account';
import { AccountService } from '../../../core/services/accounts/account.service';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {
copyToClipboard(valueToCopy: string) {
  navigator.clipboard.writeText(valueToCopy).then(() => {
    alert('Copié : '+valueToCopy);
  }).catch(() => {
    console.error('Erreur lors de la copie');
  });
}

  account?: Account;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id');

    if (accountId) {
      this.accountService.getOneAccount(accountId)
        .subscribe(account => {
          this.account = account;
        });
    }
  }
}
