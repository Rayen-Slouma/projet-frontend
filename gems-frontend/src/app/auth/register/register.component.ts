import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterDto } from '../authDtos/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  data: Date = new Date();
  focus: boolean = false;
  focus1: boolean = false;

  registerForm!: FormGroup;
  authService = inject(AuthService); 
  loading:boolean=false;

  constructor(private fb: FormBuilder) {} 

  ngOnInit(): void {
    document.body.classList.add('login-page');

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login-page');
  }

  onRegister(): void {

    if (this.registerForm.valid) {
      this.loading=false;
      const registerData: RegisterDto = this.registerForm.value; 
      this.authService.register(registerData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          alert('Registration successful! Please log in.');
          this.loading=false;
        },
        error: (err) => {
          console.error('Registration failed', err);
          alert('Registration failed. Please try again.');
        },
      }); 
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
