import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { LoginPageService } from './login-page.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm = new FormGroup({
    'email': new FormControl(),
    'password': new FormControl()
  });
  resetPasswordForm = new FormGroup({
    'email': new FormControl()
  })

  isLoggedIn!: boolean;
  invalidLogin!: boolean;
  worning = false;
  isVisible = false;
  isLoadingBtn = false;
  showEmailPopUp = false;
  data!: Object;
  password: any = "password";
  classPassword: any = "fa fa-eye errspan";
  EmailNotFoundWorning = false;

  constructor(private http: HttpClient, private router: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private loginPageService: LoginPageService) {
    this.initForm();
  }

  signIn() {
    let user = new User();
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;
    console.log("login:::" +this.loginForm);
    this.loginPageService.login(user)
      .subscribe((res: any) => {
        const token = 'token';
        console.log("token:::"+token);
        
        const role = 'role';
        console.log("res:::"+ JSON.stringify(res));
        
        const roles: any = [];
        const id = 'id';
        let arrayRoles: any = res.roles;

        if (res && res[token]) {
          let roles = ["PROFILE_ROLE", "ADMIN_ROLE"];
          this.authService.logIn(res[id], res[token], arrayRoles);
          if (roles.some((r: any) => arrayRoles && arrayRoles == r)) {
            this.router.navigate(['/planning']);
          }
        }
        else {
          this.invalidLogin = true;
        }
      },
        (error: { error: { code: string; }; }) => {
          if (error.error.code === '016' || error.error.code === '002') {
            this.worning = true;
          }
        }
      )
  }
  signOut(): void {
    this.authService.logOut();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.router.navigate(['']);
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onShowClosePopUp(): void {
    this.showEmailPopUp = !this.showEmailPopUp;
  }

  initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }
  
  hideShowPass() {
    this.password = this.password === 'password' ? 'text' : 'password';
    this.classPassword = this.classPassword === 'fa fa-eye errspan' ? 'fa fa-eye-slash errspan' : 'fa fa-eye errspan';
  }
  ngOnInit(): void {
  }

}
