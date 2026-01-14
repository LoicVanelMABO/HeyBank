import { LoginRequest } from './../../../core/models/auth/LoginRequest';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthCardComponent } from '../../../shared/components/auth-card/auth-card.component';
import { DigitPadComponent } from '../../../shared/components/digit-pad/digit-pad.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AuthCardComponent, DigitPadComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  showPassword: boolean = false;
  _authService!: AuthService;
  _router!: Router;
  isLoading= signal(false);

  constructor(AuthService: AuthService, Router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      clientCode: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[0-9]*$")]],
      password: ['', Validators.required]
  });
    this._authService = AuthService;
    this._router = Router;
  }

  onDigitClick(digit: number) {
    const currentValue = this.loginForm.get('password')?.value || '';
    this.loginForm.patchValue({
      password: currentValue + digit.toString()
    });
  }

  clearPassword() {
    this.loginForm.patchValue({
      password: ''
    });
  }

  clearLastDigit() {
    const currentValue = this.loginForm.get('password')?.value || '';
    this.loginForm.patchValue({
      password: currentValue.slice(0, -1)
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    // Logique de connexion à implémenter
    this.isLoading.set(true);
    if (this.loginForm.valid) {
      const loginData :LoginRequest ={
        clientCode: this.loginForm.value.clientCode.toString(),
        password: this.loginForm.value.password
      }
      this._authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          alert('Login successful! Redirecting to your dashboard.');
          this._router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Login failed! Please check your credentials and try again.');
  }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      }); 
    }
    this.isLoading.set(false);
  }


    getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    
    if (control?.hasError('required') && control?.touched) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    
    if (control?.hasError('email') && control?.touched) {
      return 'Please enter a valid email';
    }
    
    if (control?.hasError('minlength') && control?.touched) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }
    if (control?.hasError('maxlength') && control?.touched) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `Maximum ${maxLength} characters allowed`;
    }
    
    if (control?.hasError('passwordMismatch') && control?.touched) {
      return 'Passwords do not match';
    }
    
    return '';
  }
}
