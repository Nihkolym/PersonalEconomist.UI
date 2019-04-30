import { IUser } from './../../models/user.interface';
import { AppSettings } from './../../settings';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse } from '../models/auth-response.interface';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  public get isAuthorized() {
    return !!this._storageService.token;
  }

  constructor(
    private _storageService: StorageService,
    private _http: HttpClient

  ) { }

  public authorize(user: IUser): Observable<IAuthResponse> {
    return this._http.post<IAuthResponse>(`${AppSettings.apiHost}/api/Auth/login`, user)
      .pipe(tap(authResponse => {
        this._storageService.token = authResponse.token;
        this._storageService.isAdmin = authResponse.isAdmin;
      }));
  }

  public register(user: IUser): Observable<IUser> {
    return this._http.post<IUser>(`${AppSettings.apiHost}/api/Auth/register`, user);
  }
}
