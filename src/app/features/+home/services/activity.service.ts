import { IActivity } from './../models/activity.interface';
import { AppSettings } from './../../../core/settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ActivityService {

    constructor(private http: HttpClient) { }

    public getAll(): Observable<IActivity[]> {
      return this.http.get<IActivity[]>(`${AppSettings.apiHost}/Activity`);
    }
}
