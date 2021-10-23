import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot) : any {
    const authenticated: boolean = this.authenticationService.isLoggedIn();

    if (authenticated) {
      var element = route.data.roles.some((elt: string) =>
        localStorage.getItem(environment.ROLE) == elt
      );
      if (element) {
        return element;
      } else {
        if (localStorage.getItem(environment.ROLE) == 'ROLE_ADMIN') {
          this.router.navigate(['/planning']);
          return false;
        } else if (
          localStorage.getItem(environment.ROLE) == 'ADMIN_ROLE' ||
          localStorage.getItem(environment.ROLE) == 'PROFILE_ROLE'
        ) {
          this.router.navigate(['/']);
          return false;
        }  else {
          this.router.navigate(['/']);
          return false;
        }
      }
    }
  }
}
