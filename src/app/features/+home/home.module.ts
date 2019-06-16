import { ActivityService } from './services/activity.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './routes/home-routing.module';
import { PaymentDialogComponent } from './components/payment-dialog/payment-dialog.component';
import { CreditCardService } from './services/credit-card.service';
import { TransactionHttpService } from './services/transaction-http.service';
import { HomeTransactionComponent } from './components/home-transaction/home-transaction.component';
import { HomeDiagramComponent } from './components/home-diagram/home-diagram.component';
import { HomeInfoComponent } from './components/home-info/home-info.component';
import { ChartsModule } from 'ng2-charts';
import { TransactionService } from './services/transaction.service';
import { CounterService } from './services/counter.service';
@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        ChartsModule,
    ],
    declarations: [
      HomeComponent,
      PaymentDialogComponent,
      HomeTransactionComponent,
      HomeDiagramComponent,
      HomeInfoComponent,
    ],
    providers: [],
    entryComponents: [
      PaymentDialogComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {
  public static forRoot(): ModuleWithProviders {
    return {
        ngModule: HomeModule,
        providers: [ActivityService, CreditCardService, TransactionHttpService, TransactionService, CounterService],
    };
  }
}
