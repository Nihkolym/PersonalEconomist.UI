import { AppSettings } from './../../../core/settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IGoal } from './../models/goal.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GoalService {

    constructor(private http: HttpClient) { }

    public createGoal(goal: FormData): Observable<IGoal> {
      return this.http.post(`${AppSettings.apiHost}/Goal`, goal);
    }

    public getGoals(): Observable<IGoal[]> {
      return this.http.get<IGoal[]>(`${AppSettings.apiHost}/Goal`);
    }

    public reachGoal(goalId: string, creditCardId: string): Observable<IGoal> {
      return this.http.post<IGoal>(`${AppSettings.apiHost}/Goal/reach` ,  {'goalId': goalId.toString(), creditCardId: creditCardId.toString()});
    }
}
