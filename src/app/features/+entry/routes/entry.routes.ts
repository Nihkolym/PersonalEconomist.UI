import { HttpGuard } from './../../../core/guards/http.guard';
import { Route } from '@angular/router';
import { EntryComponent } from '../entry.component';

export const routes: Route[] = [
    {
        path: 'entry',
        component: EntryComponent,
    },
];
