import { UserResolver } from './../resolvers/user.resolver';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    providers: [UserResolver]
})
export class HomeRoutingModule { }
