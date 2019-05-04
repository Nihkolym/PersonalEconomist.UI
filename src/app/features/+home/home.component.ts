import { Router } from '@angular/router';
import { ITransaction } from './models/transaction.interface';
import { TransactionService } from './services/transaction.service';
import { CreditCardService } from './services/credit-card.service';
import { ICreditCard } from './models/credit-card.interface';
import { Item } from './models/item.interface';
import { UserService } from './../+profile/services/user.service';
import { AppSettings } from './../../core/settings';
import { ActivityService } from './services/activity.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { IActivity } from './models/activity.interface';
import { PaymentDialogComponent } from './components/payment-dialog/payment-dialog.component';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { HomeTransactionComponent } from './components/home-transaction/home-transaction.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(HomeTransactionComponent) transactions: HomeTransactionComponent;

  public activities: IActivity[] = [];

  public animal: string;

  public itemQueue: Item[] = [];

  public iconPath(name: string) {
    return `${AppSettings.images}/${name}`;
  }

  constructor(
    private snackBar: MatSnackBar,
    private activityService: ActivityService,
    private creditCardService: CreditCardService,
    private transactionService: TransactionService,
    private userService: UserService,
    private router: Router,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.activityService.getAll().subscribe(activities => {
      this.activities = activities;
    });
    this.userService.getUser().subscribe(user => {
      this.animal = user.avatar;
    });
  }

  public openPaymentDialog(items: Item[]) {
    if (!(items instanceof Array)) {
      items = [items];
    }

    this.dialog.open(PaymentDialogComponent, {
      disableClose: true,
      width: '650px',
      height: '400px',
      panelClass: 'payment-container'
    }).afterClosed().pipe(filter(c => !!c)).subscribe((card: ICreditCard) => {
      let observable: Observable<ITransaction> = null;
      if (card.id) {
        observable = this.transactionService.createTransaction({
          date: new Date(Date.now()),
          items,
          creditCardId: card.id
        });
      } else {
        observable = this.creditCardService.createCard(card).pipe(
          switchMap(_card => this.transactionService.createTransaction({
            date: new Date(Date.now()),
            items,
            creditCardId: _card.id
          }))
        );
      }

      observable.subscribe(
        () => {
          const message = items.length === 1 ? `Thanx for ${items[0].title}` : `You are so generous`;

          this.snackBar.open(message, 'Animal', {
            horizontalPosition: 'center',
            duration: 2000,
          });
          this.router.navigate(['home', 'transactions'], {
            queryParams: {refresh: new Date().getTime()}
          });
        },
        () => this.dialogService.warn('You run out of money for this item')
      );
    });
  }

  public changeItemInQueue(value: boolean, item: Item) {
        if (value) {
          this.itemQueue.push(item);
        } else {
          this.itemQueue = this.itemQueue.filter(i => i !== item);
        }
      }

  public stopPropagation(event) {
        event.stopPropagation();
      }
}
