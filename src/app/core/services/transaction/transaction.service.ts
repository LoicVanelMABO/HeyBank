import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TransactionRequest } from '../../models/transaction/TransactionRequest';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction/Transaction';
import { API_ENDPOINTS } from '../staticsValues';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  apiBaseUrl : String =  environment.apiUrl;

  constructor( private http: HttpClient ) { }

  //Create transaction method here
  createTransaction(transactionRequest: TransactionRequest) : Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiBaseUrl}${API_ENDPOINTS.CreateTransaction}`, transactionRequest);
  }

  //Get account's transactions method here
  getAccountTransactions(accountId: string) : Observable<Transaction[]> {
    const endpoint = API_ENDPOINTS.GetAccountTransactions.replace('{accountId}', accountId);
    return this.http.get<Transaction[]>(`${this.apiBaseUrl}${endpoint}`);
  }

  //Get one transaction method here
  getOneTransaction(transactionId: string) : Observable<Transaction> {
    const endpoint = API_ENDPOINTS.GetOneTransaction.replace('{transactionId}', transactionId);
    return this.http.get<Transaction>(`${this.apiBaseUrl}${endpoint}`);
  }

  //Cancel transaction method here
  cancelTransaction(transactionId: string) : Observable<Transaction> {
    const endpoint = API_ENDPOINTS.CancelTransaction.replace('{transactionId}', transactionId);
    return this.http.post<Transaction>(`${this.apiBaseUrl}${endpoint}`, {});
  }
}
