import { ChoosableContainerDirective } from './../../../../shared/directives/choosable/choosable-container.directive';
import { ICreditCard } from './../../models/credit-card.interface';
import { CreditCardService } from './../../services/credit-card.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  @ViewChild(ChoosableContainerDirective) choosableContainer: ChoosableContainerDirective;

  public card: ICreditCard = null;

  public paymentForm: FormGroup = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^(\d{4}[- ]){3}\d{4}|\d{16}$/)]),
    pinCode: new FormControl('', [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/), Validators.minLength(5)]),
  });

  public cards: ICreditCard[] = [];

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    public creditCardService: CreditCardService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.creditCardService.getAll().subscribe(cards => {
      this.cards = cards;
      setTimeout(() => {
        this.choosableContainer.ngAfterViewInit();
      }, 0);

    });
  }

  public chooseCard(card: ICreditCard) {
    this.card = card;
  }

  public onSubmit() {
    if (this.card) {
      this.close(this.card);
    } else if (this.paymentForm.valid) {
      this.close({ ...this.paymentForm.value, amount: 200});
    }
  }

  public close(card?: ICreditCard) {
    this.dialogRef.close(card);
  }
}
