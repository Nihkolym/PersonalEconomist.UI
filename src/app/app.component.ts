import { GoalService } from './features/+entry/services/goal.service';
import { ICreditCard } from './features/+home/models/credit-card.interface';
import { MatDialog } from '@angular/material';
import { Observable, of, forkJoin, zip, BehaviorSubject } from 'rxjs';
import { StorageService } from './core/auth/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/services/auth.service';
import { Auth } from './shared/enums/auth.enum';
import { Router } from '@angular/router';
import { map, filter, switchMap } from 'rxjs/operators';
import { PaymentDialogComponent } from './features/+home/components/payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'PersonalEconomist';

  public Auth = Auth;

  public isReached$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(public authService: AuthService,
    public router: Router,
    public storageService: StorageService,
    public goalService: GoalService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.storageService.user$.subscribe(() => {
      const goal = this.storageService.goal$.getValue();
      const user = this.storageService.user$.getValue();
      if (goal && user) {
        this.isReached$.next(goal.amount <= user.amount);
      }
    });

    this.storageService.goal$.subscribe(() => {
      const goal = this.storageService.goal$.getValue();
      const user = this.storageService.user$.getValue();
      if (goal && user) {
        this.isReached$.next(goal.amount <= user.amount);
      }
    });
  }

  public openCreditCardDialog() {
    this.dialog.open(PaymentDialogComponent, {
      disableClose: true,
      width: '650px',
      height: '400px',
      panelClass: 'payment-container'
    }).afterClosed().pipe(filter(c => !!c)).pipe(
      switchMap((c: ICreditCard) => {
        return this.goalService.reachGoal(this.storageService.goal$.getValue().id, c.id);
      })
    ).subscribe();
  }

  public openAuthDialog(authType: Auth) {
    this.authService.openAuthDialog(authType).subscribe(() => {
      if (authType === Auth.Sign) {
        this.router.navigate(['/entry']);
      } else {
        this.openHomePage();
      }
    });
  }

  public openHomePage() {
    this.router.navigate(['/home']);
  }

  public openInfoPage() {
    this.router.navigate(['']);
  }

  public logout() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
