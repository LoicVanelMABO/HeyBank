import { Account } from './../../models/account/Account';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../staticsValues';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AccountRequest } from '../../models/account/AccountRequest';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction/Transaction';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiBaseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Method to create a new account
  createAccount(accountData: AccountRequest): Observable<Account> {
    return this.http.post<Account>(
      `${this.apiBaseUrl}${API_ENDPOINTS.CreateAccount}`,
      accountData
    );
  }

  // Method to get all accounts
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(
      `${this.apiBaseUrl}${API_ENDPOINTS.GetAccounts}`
    );
  }

  // Method to get a single account by ID
  getOneAccount(accountId: string): Observable<Account> {
    const endpoint = API_ENDPOINTS.GetOneAccount.replace('{accountId}', accountId);
    return this.http.get<Account>(`${this.apiBaseUrl}${endpoint}`);
  }

  //To get all account's transactions
  getAllTransactionsAccount(accountId: string):Observable<Transaction[]>{
    const endpoint = API_ENDPOINTS.GetAccountTransactions.replace('{accountId}', accountId);
    return this.http.get<Transaction[]>(`${this.apiBaseUrl}${endpoint}`);
  }
}