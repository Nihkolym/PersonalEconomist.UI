import { ITransaction } from './../../models/transaction.interface';
import { TransactionService } from '../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/core/settings';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-transaction',
  templateUrl: './home-transaction.component.html',
  styleUrls: ['./home-transaction.component.scss']
})
export class HomeTransactionComponent implements OnInit {

  public transactions$: Observable<ITransaction[]> = new Observable<ITransaction[]>();

  public iconPath(name: string) {
    return `${AppSettings.images}/${name}`;
  }

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactions$ = this.transactionService.transactions$;
  }

}
