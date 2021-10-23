import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordForm = false;
  validateForm: FormGroup;
  user: User = new User();
  isLoadingBtn = false;
  userGroup = new FormGroup({
    fullName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    ConfirmPassword: new FormControl(),
  });
  userList: Array<any> = [];
  public count: number = 0;
  constructor(
    private registerServise: RegisterService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.validateForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
          ),
        ],
      ],
      confirm: ['', [this.confirmValidator]]
    });
  }
  hideError() {
    this.passwordForm = false;
  }
  creatUser() {
    this.isLoadingBtn = true;
    let user = new User();
    user.fullName = this.validateForm.controls.fullName.value;
    user.email = this.validateForm.controls.email.value;
    user.password = this.validateForm.controls.password.value;
    this.registerServise.postUser(user).subscribe(
      (data: any) => {
        this.userList = data;
        this.toastrService.success(
          `Your account created successfully`
        );
        this.isLoadingBtn = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
        this.passwordForm = false;
      },
      (error: { error: { code: string; }; }) => {
        if (error.error.code === '036') {
          this.passwordForm = true;
        } else if (error.error.code === '014') {
          this.isLoadingBtn = false;
          this.toastrService.warning(
            `You already signed up with this email!`
          );
        }
      }
    );
  }
  submitForm(value: {
    fullName: string;
    email: string;
    password: string;
    confirm: string;
  }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.creatUser();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls.confirm.updateValueAndValidity()
    );
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (
      control &&
      this.validateForm &&
      control.value !== this.validateForm.controls.password.value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit(): void {}
}
