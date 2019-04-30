import { StorageService } from './../auth/services/storage.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class HttpGuard implements CanActivate {

  constructor(
      private _storageService: StorageService,
      private _authService: AuthService,
      private _router: Router,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const currentUser = this._storageService.token;
      if (currentUser) {
          return true;
      }

      this._router.navigate(['/entry'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}
