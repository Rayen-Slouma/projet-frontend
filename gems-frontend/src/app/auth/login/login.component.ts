import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; 
import { LoginDto } from '../authDtos/login.dto'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup; 
  focus: boolean;
  focus1: boolean;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
  }

  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const loginDto: LoginDto = this.loginForm.value;
      this.authService.login(loginDto).subscribe(
        (response) => {
          console.log('Login successful', response);
          localStorage.setItem('access_token', response.access_token); // Consistent key
          this.loading = false;

          this.router.navigate(['/dashboard']); 
        },
        (error) => {
          console.error('Login failed', error);
          this.loading = false;
          alert('Invalid username or password. Please try again.');
        }
      );
    }
  }
}
