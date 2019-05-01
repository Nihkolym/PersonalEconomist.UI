import { Component } from '@angular/core';
import { AuthService } from './core/auth/services/auth.service';
import { Auth } from './shared/enums/auth.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PersonalEconomist';

  public Auth = Auth;

  constructor(public authService: AuthService, public router: Router) {}

  public openAuthDialog(authType: Auth) {
    this.authService.openAuthDialog(authType).subscribe(() => {
      if (authType === Auth.Sign) {
        this.router.navigate(['/entry']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  public logout() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
