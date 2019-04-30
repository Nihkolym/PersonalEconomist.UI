import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    public get token(): string {
        return localStorage.getItem('token');
    }

    public set token(token: string) {
        localStorage.setItem('token', token);
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
    }
}
