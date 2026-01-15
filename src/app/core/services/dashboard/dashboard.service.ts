import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, catchError, switchMap } from 'rxjs';
import { AccountService } from '../accounts/account.service';
import { TransactionService } from '../transaction/transaction.service';
import { DashboardStats } from '../../models/dashboard/DashboardStats';
import { Account } from '../../models/account/Account';
import { Transaction } from '../../models/transaction/Transaction';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) { }

  /**
   * Récupère toutes les statistiques du dashboard en une seule fois
   * Utilise forkJoin pour paralléliser les appels API
   */
  getDashboardStats(): Observable<DashboardStats> {
    return this.accountService.getAccounts().pipe(
      map((accounts: Account[]) => {
        // Calculer le nombre de comptes
        const accountsCount = accounts.length;

        // Calculer le solde total
        const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

        // Pour l'instant, les transactions en attente et cashback sont mockés
        // TODO: Implémenter la récupération réelle des transactions en attente
        const pendingTransactions = 0;
        const cashback = 0;

        return {
          accountsCount,
          pendingTransactions,
          totalBalance,
          cashback
        };
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des stats du dashboard:', error);
        // Retourner des valeurs par défaut en cas d'erreur
        return of({
          accountsCount: 0,
          pendingTransactions: 0,
          totalBalance: 0,
          cashback: 0
        });
      })
    );
  }

  /**
   * Récupère les statistiques détaillées incluant les transactions en attente
   * Cette méthode fait plusieurs appels API en parallèle
   */
  getDetailedDashboardStats(): Observable<DashboardStats> {
    return this.accountService.getAccounts().pipe(
      switchMap((accounts: Account[]) => {
        const accountsCount = accounts.length;
        const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

        // Récupérer les transactions de tous les comptes
        const transactionObservables = accounts.map(account => 
          this.transactionService.getAccountTransactions(account.id).pipe(
            catchError(() => of([]))
          )
        );

        // Si aucun compte, retourner directement
        if (transactionObservables.length === 0) {
          return of({
            accountsCount: 0,
            pendingTransactions: 0,
            totalBalance: 0,
            cashback: 0
          });
        }

        // Combiner toutes les transactions
        return forkJoin(transactionObservables).pipe(
          map((allTransactions: Transaction[][]) => {
            // Aplatir le tableau de tableaux
            const flatTransactions = allTransactions.flat();
            
            // Compter les transactions en attente
            const pendingTransactions = flatTransactions.filter(
              t => t.status === 'PENDING' || t.status === 'PROCESSING'
            ).length;

            const cashback = 0; // Pour l'instant, le cashback est mocké

            return {
              accountsCount,
              pendingTransactions,
              totalBalance,
              cashback
            };
          })
        );
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération détaillée des stats:', error);
        return of({
          accountsCount: 0,
          pendingTransactions: 0,
          totalBalance: 0,
          cashback: 0
        });
      })
    );
  }



  /**
   * Récupère uniquement le nombre de comptes
   */
  getAccountsCount(): Observable<number> {
    return this.accountService.getAccounts().pipe(
      map(accounts => accounts.length),
      catchError(() => of(0))
    );
  }

  /**
   * Récupère uniquement le solde total
   */
  getTotalBalance(): Observable<number> {
    return this.accountService.getAccounts().pipe(
      map(accounts => accounts.reduce((sum, account) => sum + account.balance, 0)),
      catchError(() => of(0))
    );
  }
}
