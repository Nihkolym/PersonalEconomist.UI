import { GoalService } from './../../../features/+entry/services/goal.service';
import { IGoal } from './../../../features/+entry/models/goal.interface';

import { UserService } from './../../../features/+profile/services/user.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/features/+profile/models/user.interface';
import { tap } from 'rxjs/operators';

@Injectable()
export class StorageService {
    public user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
    public goal$: BehaviorSubject<IGoal> = new BehaviorSubject<IGoal>(null);

    constructor(public userService: UserService, public goalService: GoalService) {}

    public get token(): string {
        return localStorage.getItem('token');
    }

    public set token(token: string) {
        localStorage.setItem('token', token);
    }

    public get userName(): string {
      return localStorage.getItem('userName');
    }

    public set userName(userName: string) {
        localStorage.setItem('userName', userName);
    }

    public get isAdmin(): boolean {
      return localStorage.getItem('isAdmin') === 'true' && this.token  ? true : false;
    }

    public set isAdmin(isAdmin: boolean) {
        localStorage.setItem('isAdmin', isAdmin.toString());
    }

    public clearCredentials(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('userName');
    }

    public loadUserInfo() {
      return this.userService.getUser().pipe(
        tap(user => {
          this.user$.next(user);
        })
      );
    }

    public loadMainGoalInfo() {
      return this.goalService.getGoals().pipe(
        tap(goals => {
          this.goal$.next(goals.find(goal => goal.isMain));
        })
      );
    }
}
