import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './http/interceptors/request.interceptor';
import { StorageService } from './auth/services/storage.service';

@NgModule({
    imports: []
})
export class CoreModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthService,
                StorageService,
                { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
            ],
        };
    }

}
