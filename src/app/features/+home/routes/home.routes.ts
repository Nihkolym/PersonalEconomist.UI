import { UserResolver } from './../resolvers/user.resolver';
import { HomeDiagramComponent } from './../components/home-diagram/home-diagram.component';
import { Route } from '@angular/router';
import { HomeComponent } from '../home.component';
import { HomeTransactionComponent } from '../components/home-transaction/home-transaction.component';
import { HttpGuard } from 'src/app/core/guards/http.guard';
import { HomeInfoComponent } from '../components/home-info/home-info.component';

export const routes: Route[] = [
    {
        path: 'home',
        component: HomeComponent,
        resolve: { team: UserResolver },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'info'
          },
          {
            path: 'info',
            component: HomeInfoComponent,
          },
          {
              path: 'transactions',
              component: HomeTransactionComponent,
          },
          {
            path: 'diagrams',
            component: HomeDiagramComponent,
          },
        ],
        canActivate: [HttpGuard]
    },
];
