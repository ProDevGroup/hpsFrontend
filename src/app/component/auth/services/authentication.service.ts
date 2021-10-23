import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn!: boolean;

  constructor(public jwtHelper: JwtHelperService, private router: Router) {
    this.checkAuthentication();
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  getRoles(roles: string | string[]) {
    if (roles && roles.includes("ADMIN_ROLE")) {
      return "ADMIN_ROLE";
    } else if (roles && roles.includes("PROFILE_ROLE")) {
      return "PROFILE_ROLE";
    } else{
      return "";
    }
  }
 
  

  logIn(userId: string, token: string, roles: string): void {
    localStorage.setItem(environment.TOKEN_NAME, token);
    localStorage.setItem(environment.ROLE, this.getRoles(roles));
    localStorage.setItem('USER_ID', userId);
   // localStorage.setItem('PROFIL_USER', this.getProfil(roles));
    //localStorage.setItem(environment.PROFIL, this.getProfil(profil));

    // localStorage.getItem(environment.PROFIL_USER);
    this.loggedIn = true;
    //  this.router.navigate(['/home']);
    console.log('token:',);
  }

  // logOut() {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/login']);
  // }
  logOut(): void {
    localStorage.removeItem(environment.TOKEN_NAME);
    localStorage.removeItem(environment.ROLE);
    //localStorage.removeItem(environment.PROFIL);

    localStorage.removeItem('USER_ID');
    localStorage.removeItem('PROFIL_USER');
    this.loggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  checkAuthentication(): void {
    const token: any = localStorage.getItem(environment.TOKEN_NAME);
    const role: any = localStorage.getItem(environment.ROLE);
    //const profil: string = localStorage.getItem(environment.PROFIL);
          console.log('=====role',role);

    const userId: any = localStorage.getItem('USER_ID');
    token ? this.logIn(userId, token, role ) : this.logOut();
  }
  public isAuthenticated(): boolean {
    const token  = localStorage.getItem('token'); // Check whether the token is expired and return true or false
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    else return false;
    
  }
}
