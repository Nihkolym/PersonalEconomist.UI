import { IAuthResponse } from './../models/auth-response.interface';
import { AuthComponent } from '../../../shared/components/auth/auth.component';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { filter, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Auth } from 'src/app/shared/enums/auth.enum';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public get isAuthorized() {
    return !!this._storageService.token;
  }

  constructor(
    private _http: HttpClient,
    public router: Router,
    private _storageService: StorageService,
    public dialog: MatDialog
  ) { }

  public openAuthDialog(authType: Auth) {
    const dialog = this.dialog.open(AuthComponent, {
      backdropClass: 'auth-backdrop',
      panelClass: 'auth-panel',
      disableClose: true,
      data: {
        authType
      }
    });

    return dialog.afterClosed().pipe(filter(res => !!res), tap((authResponse: IAuthResponse) => {
      this._storageService.token = authResponse.token;
      this._storageService.isAdmin = authResponse.isAdmin;
      this._storageService.userName = authResponse.userName;
    }));
  }

  public logOut() {
    this._storageService.clearCredentials();
  }

}
