import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../auth/services/storage.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private _storageService: StorageService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = this._storageService.token;
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                Timezone: new Date().getTimezoneOffset().toString(),
            },
        });

        return next.handle(authReq);
    }
}
