import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntryRoutingModule } from './routes/entry-routing.module';
import { EntryComponent } from './entry.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
        EntryRoutingModule,
    ],
    declarations: [
        EntryComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EntryModule { }
