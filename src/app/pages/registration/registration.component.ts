import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  public user = {
    name: '',
    email: '',
    password: '',
  };
  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      localStorage.setItem('user', JSON.stringify(formData));
      console.log('Form data submitted:', formData);
      this.router.navigate(['/login']);
    }
  }
  // register(): void {
  //   console.log('user registered', this.user);
  //   localStorage.setItem('user', JSON.stringify(this.user));
  // }
}
