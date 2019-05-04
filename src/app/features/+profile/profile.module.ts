import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {
   public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ProfileModule,
            providers: [UserService],
        };
    }
 }
