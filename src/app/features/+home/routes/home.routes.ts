import { HomeDiagramComponent } from './../components/home-diagram/home-diagram.component';
import { Route } from '@angular/router';
import { HomeComponent } from '../home.component';
import { HomeTransactionComponent } from '../components/home-transaction/home-transaction.component';

export const routes: Route[] = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
          {
              path: 'transactions',
              component: HomeTransactionComponent,
          },
          {
            path: 'diagrams',
            component: HomeDiagramComponent,
          },
        ]
    },
];
