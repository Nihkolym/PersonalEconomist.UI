import { IUser } from '../../../core/models/user.interface';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthHttpService } from '../../../core/auth/services/auth-http.service';
import { Auth } from '../../enums/auth.enum';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  public authType: Auth = Auth.Sign;

  public Auth = Auth;

  private destroy$ = new Subject();

  public authForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    private _authHttpService: AuthHttpService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.authType = data.authType;
  }

  public ngOnInit(): void {
    if (this.authType === Auth.Log) {
      this.authForm.get('userName').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
        this.authForm.get('email').setValue(value);
     });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public action() {
    if (this.authForm.valid) {
      if (this.authType === Auth.Sign) {
        this.register(this.authForm.value);
      } else {
        this.login(this.authForm.value);
      }
    } else {
      this.authForm.setErrors({ 'emptyFields': true });
    }
  }

  private register(model: IUser) {
    this._authHttpService.register(model).subscribe(user => {
      this.login(model);
    }, (err: HttpErrorResponse) => {
      if (err.status === 409) {
        this.authForm.setErrors({ 'userConflict': true });
      }
    });
  }

  private login(user: IUser) {
    this._authHttpService.authorize(user).subscribe(response => {
      this.dialogRef.close(response);
    }, (err: HttpErrorResponse) => {
      if (err.status === 400) {
        this.authForm.setErrors({ 'invalidData': true });
      }
    });
  }
}
