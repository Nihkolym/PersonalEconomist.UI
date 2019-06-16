import { IActivity } from './../models/activity.interface';
import { AppSettings } from './../../../core/settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICounter } from '../models/counter.interface';

@Injectable()
export class CounterService {

    constructor(private http: HttpClient) { }

    public getAll(): Observable<ICounter[]> {
      return this.http.get<ICounter[]>(`${AppSettings.apiHost}/Counter`);
    }
}
