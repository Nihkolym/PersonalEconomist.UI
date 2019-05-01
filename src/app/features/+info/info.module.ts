import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './info.component';
import { InfoRoutingModule } from './routes/info-routing.module';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        InfoRoutingModule,
    ],
    declarations: [
      InfoComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InfoModule { }
