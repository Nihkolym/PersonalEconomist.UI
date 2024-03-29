import { UserService } from './../+profile/services/user.service';
import { GoalService } from './services/goal.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntryRoutingModule } from './routes/entry-routing.module';
import { EntryComponent } from './entry.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        EntryRoutingModule,
    ],
    declarations: [
        EntryComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EntryModule {
   public static forRoot(): ModuleWithProviders {
        return {
            ngModule: EntryModule,
            providers: [GoalService],
        };
    }
 }
