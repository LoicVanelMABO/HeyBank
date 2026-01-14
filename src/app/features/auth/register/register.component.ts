import { RegisterRequest } from './../../../core/models/auth/RegisterRequest';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthCardComponent } from '../../../shared/components/auth-card/auth-card.component';
import { DigitPadComponent } from '../../../shared/components/digit-pad/digit-pad.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuthCardComponent, DigitPadComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;
  activeField: 'password' | 'confirmPassword' = 'password';
  _authService!: AuthService;
  _router!: Router;
  isLoading = signal(false);

  constructor(private fb: FormBuilder, AuthService: AuthService, Router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
    this._authService = AuthService;
    this._router = Router;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onDigitClick(digit: number) {
    const currentValue = this.registerForm.get(this.activeField)?.value || '';
    this.registerForm.patchValue({
      [this.activeField]: currentValue + digit.toString()
    });
  }

  clearPassword() {
    this.registerForm.patchValue({
      [this.activeField]: ''
    });
  }

  clearLastDigit() {
    const currentValue = this.registerForm.get(this.activeField)?.value || '';
    this.registerForm.patchValue({
      [this.activeField]: currentValue.slice(0, -1)
    });
  }

  setActiveField(field: 'password' | 'confirmPassword') {
    this.activeField = field;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    this.isLoading.set(true);
    if (this.registerForm.valid) {
      console.log('Register:', this.registerForm.value);

      const registerData: RegisterRequest = {
        name: ` ${this.registerForm.value.name} ${this.registerForm.value.lastname} `,
        password: this.registerForm.value.password
      }

      this._authService.register(registerData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response); 
          alert('Registration successful! You will be redirected to your dashboard.');
          alert(`Please note your client code: ${response.clientCode}`);
          this._router.navigate(['/dashboard']);
        },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed! Please try again later.');}
      });

    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
    this.isLoading.set(false);
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    
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