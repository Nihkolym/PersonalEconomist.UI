import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './entry.routes';

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
})
export class EntryRoutingModule { }
