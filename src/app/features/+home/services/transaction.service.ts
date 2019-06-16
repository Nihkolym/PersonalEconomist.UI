import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionHttpService } from './transaction-http.service';
import { ITransaction } from '../models/transaction.interface';
import { tap, switchMap } from 'rxjs/operators';
import { StorageService } from 'src/app/core/auth/services/storage.service';

@Injectable()
export class TransactionService {
  public transactions$: BehaviorSubject<ITransaction[]> = new BehaviorSubject([]);

  constructor(private transactionHttpService: TransactionHttpService, private storageService: StorageService) { }

  public loadTransactions() {
    this.transactionHttpService.getUserTransactions().subscribe(transactions => {
      this.transactions$.next(transactions);
    });
  }

  public createTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.transactionHttpService.createTransaction(transaction).pipe(
      switchMap(result => {
        this.transactions$.next([...this.transactions$.getValue(), result]);
        return this.storageService.loadUserInfo();
      }),
    );
  }
}
