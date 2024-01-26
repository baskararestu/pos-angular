import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // loginForm!: FormGroup;
  loginObj: Login;
  // constructor(private fb: FormBuilder, private router: Router) {
  //   this.loginForm = this.fb.group({
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [Validators.required]),
  //   });
  // }
  constructor(private http: HttpClient) {
    this.loginObj = new Login();
  }

  onLogin() {
    this.http
      .post(
        'https://freeapi.miniprojectideas.com/api/User/Login',
        this.loginObj
      )
      .subscribe((res: any) => {
        if (res.result) {
          alert('Login success');
        } else {
          alert(res.message);
        }
      });
  }

  onSubmit() {
    // if (this.loginForm.valid) {
    //   const enteredEmail = this.loginForm.get('email')?.value;
    //   const enteredPassword = this.loginForm.get('password')?.value;
    //   const dataUser = localStorage.getItem('user');
    //   const parseDataUser = JSON.parse(dataUser!);
    //   if (
    //     parseDataUser.email === enteredEmail &&
    //     parseDataUser.password === enteredPassword
    //   ) {
    //     console.log('login success');
    //     this.router.navigate(['']);
    //   }
    // } else {
    //   this.loginForm.markAllAsTouched();
    // }
  }
}

export class Login {
  EmailId: string;
  Password: string;
  constructor() {
    this.EmailId = '';
    this.Password = '';
  }
}
