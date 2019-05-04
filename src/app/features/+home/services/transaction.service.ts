import { ITransaction } from './../models/transaction.interface';
import { AppSettings } from './../../../core/settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TransactionService {

    constructor(private http: HttpClient) { }

    public getUserTransactions(): Observable<ITransaction[]> {
      return this.http.get<ITransaction[]>(`${AppSettings.apiHost}/Transaction/user`);
    }

    public createTransaction(transaction: ITransaction): Observable<ITransaction> {
      return this.http.post<ITransaction>(`${AppSettings.apiHost}/Transaction`, transaction);
    }
}
