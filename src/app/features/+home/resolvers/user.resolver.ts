import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { IUser } from "../../+profile/models/user.interface";
import { StorageService } from "src/app/core/auth/services/storage.service";
import { Observable, forkJoin } from "rxjs";

@Injectable()
export class UserResolver implements Resolve<IUser> {
  constructor(private storageService: StorageService) {}

  resolve(): Observable<any>|Promise<any>|any {
    return forkJoin(this.storageService.loadUserInfo(), this.storageService.loadMainGoalInfo());
  }
}
