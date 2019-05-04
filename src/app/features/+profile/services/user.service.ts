import { IUser } from './../models/user.interface';
import { AppSettings } from './../../../core/settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    public updateUser(user: IUser): Observable<IUser> {
      return this.http.put(`${AppSettings.apiHost}/User`, user);
    }

    public getUser(): Observable<IUser> {
      return this.http.get(`${AppSettings.apiHost}/User/me`);
    }
}
