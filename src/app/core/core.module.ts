import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthHttpService } from './auth/services/auth-http.service';
import { AuthService } from './auth/services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './http/interceptors/request.interceptor';
import { StorageService } from './auth/services/storage.service';

@NgModule({
    imports: [],
})
export class CoreModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthService,
                AuthHttpService,
                StorageService,
                { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
            ],
        };
    }

}
