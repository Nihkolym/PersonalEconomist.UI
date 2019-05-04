import { AppSettings } from './../../../core/settings';
import { HttpClient } from '@angular/common/http';
import { IGoal } from './../models/goal.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GoalService {

    constructor(private http: HttpClient) { }

    public createGoal(goal: FormData): Observable<IGoal> {
      return this.http.post(`${AppSettings.apiHost}/Goal`, goal);
    }
}
