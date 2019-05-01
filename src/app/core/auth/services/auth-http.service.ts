import { IUser } from '../../models/user.interface';
import { AppSettings } from '../../settings';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse } from '../models/auth-response.interface';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpService {

  constructor(
    private _http: HttpClient
  ) { }

  public authorize(user: IUser): Observable<IAuthResponse> {
    return this._http.post<IAuthResponse>(`${AppSettings.apiHost}/Auth/login`, user);
  }

  public register(user: IUser): Observable<void> {
    return this._http.post<void>(`${AppSettings.apiHost}/Auth/register`, user);
  }
}
