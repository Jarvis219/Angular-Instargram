import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/model/user-model';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  private user: UserModel[] = [];
  public matchPassword?: boolean;
  public message?: string;
  public error?: string;
  public uniqueEmail?: string;
  public countEmail?: number = 0;
  public loading: boolean = false;

  userForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
      Validators.pattern(`^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`),
    ]),
    birthday: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(100),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(100),
    ]),
  });
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  public register(): void {
    this.loading = true;
    this.user = [
      {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        birthday: this.userForm.value.birthday,
        password: this.userForm.value.password,
      },
    ];
    if (this.countEmail !== 0) {
      return;
    }

    this.userService.register(this.user).subscribe(
      (data: UserModel[]) => {
        const { message }: any = data;
        this.message = message;
        const { emailToken }: any = data;
        this.setTokenSignUp(emailToken);
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  private setTokenSignUp(token: any): void {
    localStorage.setItem('emailToken', token);
  }

  get name() {
    return this.userForm.controls;
  }
  get email() {
    return this.userForm.controls;
  }
  get password() {
    return this.userForm.controls;
  }
  get confirmPassword() {
    return this.userForm.controls;
  }

  public checkMatchPassword(): void {
    if (this.userForm.value.password != this.userForm.value.confirmPassword) {
      this.matchPassword = true;
    } else {
      this.matchPassword = false;
    }
  }

  public uniqueEmails(): void {
    this.userService.uniqueEmail(this.uniqueEmail!).subscribe((data) => {
      let { user }: any = data;
      setTimeout(() => {
        this.countEmail = user.length;
      }, 1000);
    });
  }
}
