import { Injectable , signal , computed} from '@angular/core';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { Transactions } from '../../models/transactions/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsStoreService {


  // STATE
  private readonly _transactions = signal<Transactions[]>([]);
  private readonly _loading = signal(false);

  // SELECTORS (ViewModel)
  readonly transactions = computed(() => this._transactions());
  readonly loading = computed(() => this._loading());

  constructor(private service: TransactionsService) {}

  // ACTION
  loadTransactions(): void {
    this._loading.set(true);

    this.service.getTransactions().subscribe({
      next: (data) => this._transactions.set(data),
      error: () => this._loading.set(false),
      complete: () => this._loading.set(false)
    });
  }
}
