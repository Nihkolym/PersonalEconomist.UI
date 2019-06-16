import { StorageService } from './../../../../core/auth/services/storage.service';
import { ITransaction } from './../../models/transaction.interface';
import { TransactionService } from './../../services/transaction.service';
import { UserService } from './../../../+profile/services/user.service';
import { GoalService } from './../../../+entry/services/goal.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IGoal } from 'src/app/features/+entry/models/goal.interface';
import { AppSettings } from 'src/app/core/settings';
import { forkJoin } from 'rxjs';
import * as Chart from 'chart.js';
import { monthNames } from '../../constants/month.constant';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.scss']
})
export class HomeInfoComponent implements OnInit {

  @ViewChild('lineChart') private chartRef: ElementRef;
  public chart: any;

  public mainGoal: IGoal = null;
  public amount = 0;
  public days = 0;

  constructor(
    public goalService: GoalService,
    public userService: UserService,
    public storageService: StorageService,
    public transactionService: TransactionService,
    private cdref: ChangeDetectorRef) { }

  public iconPath(name: string) {
    return `${AppSettings.images}/${name}`;
  }

  ngOnInit() {
    this.createChart();

    this.cdref.detectChanges();

    this.storageService.goal$.subscribe(goal => {
      this.mainGoal = goal;
    });

    this.storageService.user$
      .subscribe(user => {
        this.days = Math.trunc((new Date(Date.now()).getTime() - new Date(this.mainGoal.createdOn).getTime()) / (3600 * 1000));
        this.amount = user.amount;
      });
  }

  public createChart() {
    const currentMonth = new Date(Date.now()).getMonth();

    this.transactionService.transactions$.subscribe(transactions => {
      const days = Array.from(
        new Set(transactions.map(transaction => new Date(transaction.date).getDate()))
       ).sort().map(t => t.toString());

      const dayСontribution = new Map();

      for (const day of days) {
        const contribution = transactions
          .filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.getDate().toString() === day && transactionDate.getMonth() === currentMonth;
          })
          .map(transaction => transaction.amount)
          .reduce((total: number, amount: number) => total += amount, 0);
        dayСontribution.set(day, contribution);
      }

      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'line',
      data: {
       labels: days,
       datasets: [{
           label: `Contribution per day`,
           data: [...Array.from(dayСontribution)].sort((a: any, b: any) => {
            return a[0] > b[0] ? 1 : -1;
           }
          ).map(a => a[1].toString()),
           fill: false,
           lineTension: 0.2,
           borderColor: 'black',
           borderWidth: 2,
           backgroundColor: ['black']
       }]
      },
      options: {
       title:{
           text: `Money transaction diagram in ${monthNames[currentMonth]}`,
           display: true,
       },
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero: true
               }
           }]
       }
      }
      });
    }
    );

  }


}
