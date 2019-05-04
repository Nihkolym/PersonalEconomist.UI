import { Router, ActivatedRoute } from '@angular/router';
import { ITransaction } from './../../models/transaction.interface';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/core/settings';

@Component({
  selector: 'app-home-transaction',
  templateUrl: './home-transaction.component.html',
  styleUrls: ['./home-transaction.component.scss']
})
export class HomeTransactionComponent implements OnInit {

  public transactions: ITransaction[] = [];

  public iconPath(name: string) {
    return `${AppSettings.images}/${name}`;
  }


  constructor(private transactionService: TransactionService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParamMap.subscribe(() => {
      this.loadTransactions();
    });
  }

  public loadTransactions() {
    this.transactionService.getUserTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

}
